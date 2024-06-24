const express = require('express');
const router = express.Router();
const authControl = require("../controllers/authControl");
const Reviewer = require("../controllers/reviewer");

router.post('/login',authControl.postLogin);

router.get('/review/:token',Reviewer.getManuscriptByToken);

router.post('/register',authControl.postRegister);

router.post('/editorReg',authControl.postEditorRegister);

router.post('/reviewrReg',authControl.postReviewrRegister);
module.exports = router;