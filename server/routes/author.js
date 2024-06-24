const express = require('express');
const Author = require('../controllers/author');
const router = express.Router();


router.post('/',Author.postManuscript);
router.get('/getNotification',Author.getNotification)
router.post('/SubmitRevised',Author.postSubmitRevised)
router.get('/SubmissionNeedingRevision',Author.getSubmissionNeedingRevision)
router.get('/getRevison',Author.getRevison)
router.get('/SubmissionAccepted',Author.getSubmissionAccepted)
router.get('/Rejected',Author.getRejected)

router.get('/',Author.getManuscript);


module.exports = router;