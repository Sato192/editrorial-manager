const Manuscript = require ('../models/manuscript');
const moment = require ('moment');
exports.postManuscript = (req,res) => {

    const title = req.body.title;
    const abstract = req.body.abstract;
    const author = req.user._id;
    const coAuthor = req.body.coAuthor;
    const affiliation = req.body.affiliation;
    const M_type = req.body.type;
    const upoladDate = moment().format('LLL');
    const editor = null;
    const reviewers = [];
    const manuscript = new Manuscript({title : title, M_type :M_type , coAuthor : coAuthor,affiliation : affiliation ,  abstract : abstract , author : author ,
        upoladDate: upoladDate , editor : editor, reviewers : reviewers 
    });
    console.log(req.body);
    manuscript.save()
    .then(result=>{
        console.log("manuscript created");
    })
    return res.end();
}

exports.getManuscript = (req,res)=> {
     Manuscript.find({author : req.user._id})
     .then((manuscript)=>{
        console.log(req.session.sato);
        res.json (manuscript);
    }).catch(error=>{
        console.log(error);
    })
};

exports.getManuscriptById=(req,res,next) =>{
    let id=req.params.manuscriptID;
    Manuscript.fetchAll((manuscripts)=>{
      const manuscript =  manuscripts.find(item=>id==item.id)
      console.log(manuscript);
      console.log(id);
      res.json(manuscript);
    })
}