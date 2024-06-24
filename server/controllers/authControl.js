const Author = require('../models/author')
const Admin = require ('../models/admin');
const Editor = require('../models/editor');
const Reviewer = require('../models/reviewer');
exports.postLogin = (req,res)=>{
    const email = req.body.email;
    const password = req.body.password;
    const role = req.body.role;
    if(role === "author")
        {
            Author.findOne({email : email})
            .then(user=>{
                if (user){
                    if(user.password===password)
                        {   
                            req.session.sato="author";
                            req.session.user = user;
                            console.log("author found");
                            res.send(req.session.sato);

                        }
                        else{
                            res.send('ivalid');
                        }
                } else{
                    res.send('invalid')
                }
            }).catch(error =>{
                console.log(error);
            }
            )
        }
        else if(role === "admin") {
            Admin.findOne({email : email})
            .then(user=>{
                if (user){
                    if(user.password===password)
                        {
                            req.session.sato="admin";
                            req.session.user = user;
                            console.log("admin found");
                            res.send(req.session.sato);
                        }
                        else{
                            res.send('ivalid');
                        }
                } else{
                    res.send('invalid')
                }
            }).catch(error =>{
                console.log(error);
            }
            )
        } else if(role === "editor") {
            Editor.findOne({email : email})
            .then(user=>{
                if (user){
                    if(user.password===password)
                        {
                            req.session.sato="editor";
                            req.session.user = user;
                            console.log("editor found");
                            res.send(req.session.sato);
                        }
                        else{
                            res.send('ivalid');
                        }
                } else{
                    res.send('invalid')
                }
            }).catch(error =>{
                console.log(error);
            }
            )
        }else if(role === "reviewer") {
            Reviewer.findOne({email : email})
            .then(user=>{
                if (user){
                    if(user.password===password)
                        {
                            req.session.sato="reviewer";
                            req.session.user = user;
                            console.log("editor found");
                            res.send(req.session.sato);
                        }
                        else{
                            res.send('ivalid');
                        }
                } else{
                    res.send('invalid')
                }
            }).catch(error =>{
                console.log(error);
            }
            )
        }else{
            res.send('invalid');
        }
    
};

exports.postRegister = (req,res)=>{
    const email = req.body.email;
    const name = req.body.nom;
    const password = req.body.password;
    const manuscripts = [];
    Author.findOne({email : email})
    .then(user=>{
        if(!user){
            author = new Author({email : email,name : name, password : password, manuscripts : manuscripts});
            author.save()
            .then(result =>{
                console.log("author created");
                res.send('done');
            })
        }else
        {
            console.log("author already exist");
            res.send('error');
        }
    }).catch(error=>{
        console.log(error);
    })
   
}

exports.postEditorRegister = (req,res)=>{
    const email = req.body.email;
    const name = req.body.nom;
    const password = req.body.password;
    const manuscripts = [];
    Editor.findOne({email : email})
    .then(user=>{
        if(!user){
            editor = new Editor({email : email,name : name, password : password, manuscripts : manuscripts});
            editor.save()
            .then(result =>{
                console.log("editor created");
                res.send('done');
            })
        }else
        {
            console.log("editor already exist");
            res.send('error');
        }
    }).catch(error=>{
        console.log(error);
    })
}

exports.postReviewrRegister = (req,res)=>{
    const email = req.body.email;
    const name = req.body.nom;
    const password = req.body.password;
    const manuscripts = [];
    Reviewer.findOne({email : email})
    .then(user=>{
        if(!user){
            reviewer = new Reviewer({email : email,name : name, password : password, manuscripts : manuscripts});
            reviewer.save()
            .then(result =>{
                console.log("Reviewer created");
                res.send('done');
            })
        }else
        {
            console.log("Reviewer already exist");
            res.send('error');
        }
    }).catch(error=>{
        console.log(error);
    })
}

