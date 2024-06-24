const Manuscript = require('../models/manuscript');
const Reviewer = require('../models/reviewer');
const Review = require('../models/review');
const Editor = require('../models/editor')
const moment = require('moment');
const Reviewr = require('../models/reviewer');

exports.getNotification = (req,res)=>{
    const Getcounts = async()=>{
        try{
            const newSubmission = await Reviewer.findOne({_id : req.user._id}).then(reviewer => {return reviewer.manuscripts.length});
            const completed = await Reviewer.findOne({_id : req.user._id}).then(reviewer => {return reviewer.completed.length});
            res.send({
                newSubmission: newSubmission,
                completed:completed
               
            })
        }
     catch (err) {
        console.error(err);
      }
    }
    Getcounts();
}


exports.getManuscriptByToken = (req, res) => {
    const token = req.params.token;
    Manuscript.findOne({ "nonRegistReviewer.reviewToken": token })
        .then(manuscript => {
            if (manuscript) {
                res.send(manuscript);
                console.log('found');
            }
            else {
                console.log('not found');
                res.send('error');
            }
        }).catch(error => console.log(error))

}
exports.postReviewWitoutToken = (req, res) => {
    const manuscriptId = req.body.manuscript;
    const reviewDate = moment().format('LLL');
    const reviewer = req.body.name;
    const content = req.body.review;
    const status = req.body.status;
    const review = new Review({
        manuscript: manuscriptId, review: content, reviewDate: reviewDate
        , reviewer: reviewer, status: status
    });
    return review.save()
        .then(result =>
            Reviewer.findOne({ _id: req.user._id })
                .then(reviewer => {
                    reviewer.manuscripts = reviewer.manuscripts.filter(manuscript => manuscript != manuscriptId);
                    reviewer.completed.push({
                        _id: manuscriptId,
                        reviewDate: moment().format('LLL'),
                        status: status
                    });
                    return reviewer.save();
                }
                ).then(result => {
                    Editor.findOne({ reviewersInvited: { $elemMatch: { _id: req.user._id } } })
                        .then(editor => {
                            editor.reviewersInvited.forEach(item => {
                                if (item._id.toString() === req.user._id.toString()) {
                                    item.respond = true;
                                }
                            })
                            return editor.save();
                        }
                        ).then(result => {
                            res.send('done')
                        }
                        ).catch(erorr => console.log(erorr))
                }
                )
                .catch(error => console.log(error))
        ).catch(error => console.log(error))
}
exports.postReviewManuscriptviaEmail = (req, res) => {
    const manuscriptId = req.body.manuscript;
    const reviewDate = moment().format('LLL');
    const reviewer = req.body.name;
    const content = req.body.review;
    const status = req.body.status;
    const token = req.body.token;
    console.log(token);
    Manuscript.findOne({ _id: manuscriptId })
        .then(manuscript => {
            manuscript.nonRegistReviewer.forEach(element => {
                if (element.reviewToken === token) {
                    element.review = content;
                    element.reviewStatus = status;
                    element.reviewToken = null;
                    element.reviewTokenExpires = null;

                }
            })
            return manuscript.save()
                .then(result => {
                    const review = new Review({
                        manuscript: manuscriptId, review: content, reviewDate: reviewDate
                        , reviewer: reviewer, status: status
                    });
                    return review.save()
                }).then(result => {
                    console.log('review created');
                    res.send("done")
                }
                )
        }).catch(error => console.log(error))

}
exports.getManuscripts = (req, res) => {
    Reviewer.find({ _id: req.user._id }).populate("manuscripts", 'title abstract affiliation upoladDate dueDate filePath')
        .then(reviewers => {
            const manuscripts = reviewers.map(item => item.manuscripts);
            const upadatedManuscripts = [...manuscripts[0]];
            res.send(upadatedManuscripts);
        }).catch(error => console.log(error));
}

exports.getManuscriptById = (req, res) => {
    const manuscriptId = req.params.manuscriptId;
    Manuscript.findOne({ _id: manuscriptId, reviewers: { $elemMatch: { _id: req.user._id } } }).select('title')
        .then(manuscript => {
            res.send(manuscript)
        }).catch(error => {
            console.log(error);
        })
}

exports.getCompleted = (req, res) => {
    Reviewer.findOne({ _id: req.user._id }).populate("completed._id", 'filePath title abstract affiliation upoladDate dueDate')
        .then(reviewer => {
            console.log(reviewer.completed)
            console.log("rr");
            res.send(reviewer.completed);
        }).catch(error => console.log(error))
}