const User = require('../models/userModel');
const { v1: uuidv1 } = require('uuid');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');

exports.read = (req, res) => {
    req.profile.hashed_password = undefined;
    req.profile.salt = undefined;
    return res.json(req.profile);
}

exports.signup = function (req, res) {
    const { name, email, password } = req.body;
    let username = uuidv1();
    let profile = `${process.env.CLIENT_URL}/profile/${username}`;
    let newUser = new User({ name, email, password, username, profile });
    user.save((err, user) => {
        if (err) {
            return res.status(400).json({
                err
            })
        }

        res.json({
            message: "Signup success!"
        })
    })
}

exports.signin = function (req, res) {
    const { email, password } = req.body;
    User.findOne({ email }, (err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: "User with that email not exist!"
            })
        }

        if (!user.authenticate(password)) {
            return res.status(401).json({
                error: "Email and Password dont match!"
            })
        }

        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
        res.cookie('t', token, { expiresIn: "1d" });
        const { _id, name, username, email, role } = user;
        return res.json({
            token,
            user: {
                _id,
                name,
                username,
                email,
                role
            }
        })

    })
}

exports.signout = function (req, res) {
    res.clearCookie('t');
    return res.json({ message: "Signout Success!" })
}

exports.requireSignin = expressJwt({
    secret: process.env.JWT_SECRET,
    // userProperty:"auth",
    algorithms: ['HS256']
})

exports.authMiddleware = function (req, res, next) {
    // console.log('body:',req.body);
    User.findById({ _id: req.user._id }).exec((err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: "user not found!"
            })
        }
        req.profile = user;
        next();
    })

}

exports.adminMiddleware = function (req, res, next) {
    User.findById({ _id: req.user._id }).exec((err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: "user not found!"
            })
        }

        if (req.profile.role === 0) {
            res.status(403).json({
                error: "Access denied!"
            })
        }
        req.profile = user;
        next();
    })

}

