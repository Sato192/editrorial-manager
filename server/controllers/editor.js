const Manuscript = require('../models/manuscript');
const Reviewer = require('../models/reviewer');
const crypto = require('crypto');
const nodeMailer =require('nodemailer');
const mongoose =require('mongoose');
const Editor = require('../models/editor');
const Review = require('../models/review');
const transporter = nodeMailer.createTransport({
    service: "Gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "mstfyahmydw@gmail.com",
      pass: "azpr sezy rkqh objt",
    },
  });
exports.getNewSubmissions = (req,res) =>{
    Manuscript.find({status : 'Submitted', revised: false})
    .populate('author','name')
    .then(manuscripts=>{
        res.json(manuscripts);
    }).catch(error=>{
        console.log(error);
    })

}
exports.assignEditor= (req,res)=>{
    const manuscriptId = req.body.manuscriptId;
    const editorId = req.body.editorId;
    Manuscript.findById(manuscriptId)
    .then(manuscript=>{
        manuscript.editor= editorId;
        manuscript.status='With Editor';
        Editor.findOne({_id : editorId})
        .then(editor =>{
            editor.manuscripts.push(manuscriptId);
            editor.save();
            console.log("editor hh")
        }).catch(error => console.log(error));
        return manuscript.save();
    })
    .then(result=>{
        console.log("editor 2hh")
        res.send("done dd");
    }).catch(error =>{
        console.log(error);
    })
}
exports.postAssignToMyself= (req,res)=>{
    if(req.user.admin){
        const id = req.body.id;
        Manuscript.findById(id)
        .then(manuscript=>{
            manuscript.editor= req.user._id;
            manuscript.status='With Editor';
            Editor.findOne({_id : req.user._id})
            .then(editor =>{
                editor.manuscripts.push(id);
            }).catch(error => console.log(error));
            return manuscript.save();
        })
        .then(result=>{
            res.send("done");
        }).catch(error =>{
            console.log(error);
        })
      
    }
    else
    {
        console.log('not authorised')
        res.send('not authorised');
    }
}
exports.getReviewersNoresponse =(req,res)=>{
    Editor.findOne({_id: req.user.id}).populate('reviewersInvited._id' ,'name email manuscripts completed').populate("reviewersInvited.manuscript", "title abstract dueDate")
    .then(editor =>
        {
          const reviewers= editor.reviewersInvited.filter(item => !item.respond);

          res.send(reviewers)
        }
    )
}
exports.getNotification = (req,res)=>{
    const Getcounts = async()=>{
        try{
            const newSubmission = await Manuscript.countDocuments({status : 'Submitted' , revised : false});
            const SubmissionsUnderReview = await Manuscript.countDocuments({status : 'Under Review'});
            const NewAssignment = await Manuscript.countDocuments({status : 'With Editor' , editor : req.user._id});
            const reviewerNoresponse = await Editor.findOne({_id: req.user._id})
            .then(editor =>
                {
                  const reviewers= editor.reviewersInvited.filter(item => !item.respond);
                  return reviewers.length;
                }
            );
            const activeDiscussions = await Manuscript.countDocuments({status : 'Under Disscussion' , editor : req.user._id});
            const SubmissionSendToAuthorForApproval = await  Manuscript.countDocuments({ status: { $in: ['Minor revision', 'Major revision']}});
            const revisedSubmissionsReqAssignmments = await   Manuscript.countDocuments({editor : req.user._id,revised : true,status :'Submitted'})
            res.send({
                admin : req.user.admin,
                newSubmission: newSubmission,
                NewAssignment : NewAssignment,
                reviewerNoresponse : reviewerNoresponse,
                activeDiscussions : activeDiscussions,
                SubmissionSendToAuthorForApproval : SubmissionSendToAuthorForApproval,
                revisedSubmissionsReqAssignmments : revisedSubmissionsReqAssignmments,
                SubmissionsUnderReview : SubmissionsUnderReview
            })
        }
     catch (err) {
        console.error(err);
      }
    }
    Getcounts();
}

exports.getReviewers= (req,res)=>{
    const manuscriptID =req.query.id; 
    Reviewer.find(
    )
    .then(reviewers =>{
      
        res.json(reviewers);
    })
    .catch(error=>{
        console.log(error);
    })
}

exports.getManuscriptByIdd= (req,res)=>{
    const id = req.body.id;
    Manuscript.findById(id).populate("author", " name email")
    .then(manuscript =>{
        if(manuscript)
            {
                console.log(manuscript)
                
                res.send(manuscript);
            }
            else
            {
                res.send('invalid');
            }
    }).catch(error =>{
        console.log(error);
    })
}
exports.postAssignReviewers= (req,res)=>{
    console.log(req.body.id);
    const dueDate = req.body.due;
    const manuscriptID = req.body.id;
    const reviewers= req.body.reviewers;
    const ReviewerIds = reviewers.map( item => item._id )
    Manuscript.findById(manuscriptID)
    .then(manuscript =>{
        manuscript.reviewers.push(...ReviewerIds);
        manuscript.status= 'Under Review';
        manuscript.dueDate = dueDate;
       return manuscript.save();
    }).then(result =>{
    
        Reviewer.find({ _id : ReviewerIds })
        .then( reviewers =>{
            reviewers.map(reviewer =>{ reviewer.manuscripts.push(manuscriptID)
            Editor.findOne({_id : req.user._id})
            .then(editor => 
            {
                editor.reviewersInvited.push({_id :reviewer._id , manuscript:manuscriptID})
                editor.save();
            } ).catch(error => console.log(error));

             reviewer.save();
            } )
          
            res.send('done');
        } )
    })
    .catch(error =>
        {
            console.log(error);
        }
    )
}
exports.PostSendNormalEmail = (req,res)=>{
    const email= req.body.email;
    const body = req.body.body;
    console.log('sending email ..')
    transporter.sendMail({
        to : email,
        from : "editorial@fsa.com",
        subject : "Remind Author to submit Manuscript",
        html : body
    }).then(result=>{
        console.log('email send');
        res.send('done');
    }).catch(error=>{
        console.log(error);
    })
}

exports.postSendEmail= (req,res)=>{
    const token = crypto.randomBytes(20).toString('hex');
    const email= req.body.email;
    const body = req.body.body;
    console.log('sending email ..')
    transporter.sendMail({
        to : email,
        from : "editorial@fsa.com",
        subject : "Invitation to Review a Manuscript",
        html : body+"<br> <a target='_blank' href='http://localhost:5173' > Click here to login into editorial manager </a>"
    }).then(result=>{
        console.log('email send');
        res.send('done');
    }).catch(error=>{
        console.log(error);
    })
}

exports.assignViaEmail= (req,res)=>{
    const token = crypto.randomBytes(32).toString('hex');
    console.log(token);
    const email= req.body.email;
    const body = req.body.body;
    const manuscriptID = req.body.manuscriptId;
    const dueDate= req.body.date;
    console.log(manuscriptID);
    console.log(dueDate);
    console.log('sending email ..')
    transporter.sendMail({
        to : email,
        from : "editorial@fsa.com",
        subject : "Invitation to Review a Manuscript",
        html : body+`<br> <a target='_blank' href="http://localhost:5173/reviewThis/${token}" /> Click here to review manuscript </a>`
    }).then(result=>{
     Manuscript.findById(manuscriptID)
        .then(manuscript =>{
            manuscript.nonRegistReviewer.push({email : email,reviewToken:token,reviewTokenExpires:dueDate });
            manuscript.dueDate=dueDate;
            manuscript.status= 'Under Review';
           return manuscript.save();})
           .then(result =>{
            console.log('email send');
           res.send('done');
           }).catch(error=> console.log(error))
    }).catch(error=>{
        console.log(error);
    })
}

exports.getAssignments= (req,res)=>{
    Manuscript.find({editor : req.user._id , status:"With Editor"})
    .then(manuscripts =>{

        res.send(manuscripts);
    }).catch(error =>console.log(error));
}

exports.getEditor = (req,res)=>{
    console.log(req.params.manuscript) ;
    Editor.find({admin:false})
    .then(editor =>{
        res.send(editor)
    }).catch(error =>
        console.log(error)
    )
}

exports.postReturnToAuthor = (req,res)=>{
    const status = req.body.status;
    const manuscriptId = req.body.manuscriptId;
    const note = req.body.note;
    console.log(status,manuscriptId,note);
    Manuscript.findOne({_id:manuscriptId})
    .then(manuscript =>{
        manuscript.status=status;
        manuscript.editorNote=note;
        manuscript.editor=req.user._id;
        console.log(manuscript.status);
        manuscript.save();
         
         res.send("done");
    }).catch(error => console.log(error));
}
exports.getRevisedSubmissionsReqAssignmments= (req,res)=>{
    Manuscript.find({editor : req.user._id , revised : true,status :'Submitted'}).populate("author","name email").
    then(manuscripts =>{
        res.send(manuscripts)
    }).catch(error => console.log(error))
}

exports.getSubmissionSendToAuthorForApproval = (req,res)=>{
    Manuscript.find({ status: { $in: ['Minor revision', 'Major revision']}}).populate("author","name email")
    .then(manuscripts =>{
        console.log(manuscripts)
        res.send(manuscripts)
    }).catch(error => console.log(error))
}
exports.getManuscriptsUnderReveiw= (req,res)=>{
    Manuscript.find({ status:"Under Review" }).populate("reviewers")
    .then(manuscripts =>{
        console.log(manuscripts)
        res.send(manuscripts)
    }).catch(error => console.log(error))
}

exports.getManuscriptReviews = (req,res)=>{
    const manuscriptId= req.params.manuscriptId;
    Review.find({manuscript: manuscriptId}).populate("manuscript","title")
    .then(reviews =>{
        res.send(reviews);
    }).catch(error => console.log(error)
    )
}