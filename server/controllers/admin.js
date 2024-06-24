const nodeMailer =require('nodemailer');
const crypto = require('crypto');
const Reviewer = require('../models/reviewer');
const Editor = require('../models/editor');
const Author = require('../models/author');
const { Console } = require('console');

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
exports.postAddEditor=(req,res)=>{
    const token = crypto.randomBytes(20).toString('hex');
    const email= req.body.email;
    const body = req.body.body;
    transporter.sendMail({
        to : email,
        from : "editorial@fsa.com",
        subject : "Invitation to Register as a Reviewer on Editorial Manager",
        html : body+"<br> <a target='_blank' href='http://localhost:5173/editorReg' > Click here to continue to register </a>"
    }).then(result=>{
        res.send('good');
    }).catch(error=>{
        console.log(error);
    })
}
 exports.postAddReviewr=(req,res)=>{
    const token = crypto.randomBytes(20).toString('hex');
    const email= req.body.email;
    const body = req.body.body;
    transporter.sendMail({
        to : email,
        from : "editorial@fsa.com",
        subject : "Invitation to Register as an Editor on Editorial Manager",
        html : body+"<br> <a target='_blank' href='http://localhost:5173/reviewrReg' > Click here to continue to register </a>"
    }).then(result=>{
        res.send('good');
    }).catch(error=>{
        console.log(error);
    })
}


exports.getReviewr= (req,res)=>{
    
    Reviewer.find()
    .then(reviewrs =>{
       // console.log(reviewrs);
        res.json(reviewrs);
    })
    .catch(error=>{
        console.log("error",error);
    })

}

exports.removeReviewerById= (req,res)=>{
    const id =req.body.id;
    Reviewer.deleteOne({_id : id })
    .then(result=>{
        console.log(result);
        res.send("success")
    })
    .catch(error=>{
        console.log(error);
    })
}

exports.getEditor = (req,res)=>{
    Editor.find()
    .then(editors =>{
       // console.log(reviewrs);
        res.json(editors);
    })
    .catch(error=>{
        console.log("error",error);
    })
}

exports.removeEditorById=(req,res)=>{
    const id =req.body.id;
    Editor.deleteOne({_id : id })
    .then(result=>{
        console.log(result);
        res.send("success")
    })
    .catch(error=>{
        console.log(error);
    })
}

exports.getAuthor= (req,res)=>{
    Author.find()
    .then(authors =>{
       // console.log(reviewrs);
        res.json(authors);
    })
    .catch(error=>{
        console.log("error",error);
    })
}

exports.removeAuthorById= (req,res)=>{
    const id =req.body.id;
    Author.deleteOne({_id : id })
    .then(result=>{
        console.log(result);
        res.send("success")
    })
    .catch(error=>{
        console.log(error);
    })
}