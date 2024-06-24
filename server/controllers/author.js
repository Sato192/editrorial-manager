const Manuscript = require('../models/manuscript');
const moment = require('moment');



exports.postManuscript = (req, res) => {
    const file = req.file;
    const title = req.body.title;
    const abstract = req.body.abstract;
    const author = req.user._id;
    const coAuthor = req.body.coAuthor;
    const affiliation = req.body.affiliation;
    const M_type = req.body.type;
    const upoladDate = moment().format('LLL');
    const editor = null;
    const reviewers = [];
    const filePath = file.path;
    const manuscript = new Manuscript({
        title: title, M_type: M_type, coAuthor: coAuthor, affiliation: affiliation, abstract: abstract, author: author,
        filePath: filePath, upoladDate: upoladDate, editor: editor, reviewers: reviewers
    });
    console.log(req.body);
    console.log(req.file);
    if (!file) {
        return res.send('error')
    }
    manuscript.save()
        .then(result => {
            console.log("manuscript created");
            res.send('done');
        }).catch(error =>
            console.log(error)
        )
}
exports.postSubmitRevised = (req, res) => {
    const file = req.file;
    const manuscriptiD = req.body.manuscriptId
    Manuscript.findById(manuscriptiD)
    .then(manuscript=>{
        manuscript.filePath = file.path;
        manuscript.status = "Submitted";
        manuscript.revised = true;
    return manuscript.save();
    }).then(result =>
       { res.send("ok");}
    ).catch(error =>{
        console.log(error);
        res.send("error");
    })
   
}


exports.getManuscript = (req, res) => {
    Manuscript.find({ author: req.user._id })
        .then((manuscript) => {
            console.log(req.session.sato);
            res.json(manuscript);
        }).catch(error => {
            console.log(error);
        })
};
exports.getRevison = (req,res)=>{
    Manuscript.find({ author: req.user._id , revised : true })
        .then((manuscript) => {
            console.log(req.session.sato);
            res.json(manuscript);
        }).catch(error => {
            console.log(error);
        })
}

exports.getNotification = (req, res) => {
    const Getcounts = async () => {
        try {
            const trackmanuscript = await Manuscript.countDocuments({ author: req.user._id });
            const RevisionsBeignProceced = await Manuscript.countDocuments({ author: req.user._id , revised : true  });
          const SubsNeedingRevisions = await Manuscript.countDocuments({ author: req.user._id, status: { $in: ['Minor revision', 'Major revision'] } });
          const backToAuthor = await Manuscript.countDocuments({ author: req.user._id, status: "Rejected" });
          const completed = await Manuscript.countDocuments({ author: req.user._id, status: "Accepted" });
            res.send({
                trackmanuscript: trackmanuscript,
                RevisionsBeignProceced : RevisionsBeignProceced,
                SubsNeedingRevisions : SubsNeedingRevisions,
                backToAuthor:backToAuthor,
                completed:completed,
            })
        }
        catch (err) {
            console.error(err);
        }
    }
    Getcounts();
}

exports.getSubmissionNeedingRevision = (req, res) => {
    Manuscript.find({ author: req.user._id, status: { $in: ['Minor revision', 'Major revision'] } })
        .then((manuscript) => {
            res.json(manuscript);
        }).catch(error => {
            console.log(error);
        })
}
exports.getSubmissionAccepted = (req,res) => {
    Manuscript.find({ author: req.user._id, status: "Accepted"})
    .then((manuscript) => {
        res.json(manuscript);
    }).catch(error => {
        console.log(error);
    })
}
exports.getRejected = (req,res) => {
    Manuscript.find({ author: req.user._id, status: "Rejected"})
    .then((manuscript) => {
        res.json(manuscript);
    }).catch(error => {
        console.log(error);
    })
}