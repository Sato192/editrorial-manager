const express = require('express');
const admin = require('../controllers/admin')
const router = express.Router();

router.post('/addEditor',admin.postAddEditor);

router.post('/addReviewr',admin.postAddReviewr);

router.get('/getReviewr',admin.getReviewr);

router.post('/removeByid',admin.removeReviewerById);

router.get('/getEditor',admin.getEditor);
router.post('/removeEditor',admin.removeEditorById);

router.get('/getAuthor',admin.getAuthor);
router.post('/removeAuthor',admin.removeAuthorById);

router.get('/',(req,res)=>{
    res.json(null);
})


module.exports = router;