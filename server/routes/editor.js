const express = require('express');
const editor = require('../controllers/editor');

const router = express.Router();

router.get('/admin', (req,res)=>{
    const data = req.user.admin;
    res.send(data);
})
router.post('/Assignmyself',editor.postAssignToMyself)
router.get('/newSubmissions',editor.getNewSubmissions);
router.get('/getNotification',editor.getNotification);
router.get('/getReviewers',editor.getReviewers);
router.post('/getManuscriptById',editor.getManuscriptByIdd);
router.post ('/AssignReviewers',editor.postAssignReviewers);
router.post('/sendEmail',editor.postSendEmail);
router.post('/AssignviaEmail',editor.assignViaEmail)
router.get('/assignments',editor.getAssignments)
router.get('/getEditors/:manuscript',editor.getEditor)
router.post('/assignEditor',editor.assignEditor)
router.post('/backToAuthor',editor.postReturnToAuthor);
router.get('/revisedSubmissionsReqAssignmments',editor.getRevisedSubmissionsReqAssignmments)
router.get('/SubmissionSendToAuthorForApproval',editor.getSubmissionSendToAuthorForApproval)
router.post('/sendNormalEmail',editor.PostSendNormalEmail);
router.get('/getReviews/:manuscriptId',editor.getManuscriptReviews)
router.get('/getReviewersNoresponse',editor.getReviewersNoresponse)
router.get('/manuscriptsUnderReveiw',editor.getManuscriptsUnderReveiw)

router.get('/:manuscriptId',)



module.exports = router;