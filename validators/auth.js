const {check} = require('express-validator');

exports.userSignupValidator = [
    check('name').not().isEmpty().withMessage('Name is requared!'),
    check('email').isEmail().withMessage('Must be valid Email!'),
    check('password').isLength({min:6}).withMessage('password Bust have at least 6 character!')
];

exports.userSigninValidator = [
    check('email').isEmail().withMessage('Must be valid Email!'),
    check('password').isLength({min:6}).withMessage('password Bust have at least 6 character!')
];