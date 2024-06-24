const express = require('express');
const Reviewer = require('../controllers/reviewer');
const router = express.Router();

router.post('/review',Reviewer.postReviewManuscriptviaEmail);
router.get('/getManuscripts',Reviewer.getManuscripts);
router.get('/getbyId/:manuscriptId',Reviewer.getManuscriptById);
router.post('/reviewWitoutToken',Reviewer.postReviewWitoutToken)
router.get('/getCompleted',Reviewer.getCompleted);
router.get('/getNotification',Reviewer.getNotification);


router.get('/',(req,res)=>{
    res.json(null);
})


module.exports = router;