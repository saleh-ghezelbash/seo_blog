const express = require('express');

const {signup,signin,signout,requireSignin} = require('../controllers/authController');
const {runValidation} = require('../validators');
const {userSignupValidator,userSigninValidator} = require('../validators/auth');

const router = express.Router();

router.post('/signup',userSignupValidator,runValidation, signup);
router.post('/signin',userSigninValidator, runValidation,signin);
router.get('/signout', signout);


module.exports = router;