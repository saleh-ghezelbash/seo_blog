const express = require('express');

const {userById,read,update,purchaseHistory} = require('../controllers/userController');
const {requireSignin,authMiddleware,adminMiddleware} = require('../controllers/authController');

const router = express.Router();


// router.get('/orders/by/user/:userId',requireSignin,purchaseHistory);
router.get('/user/:userId',requireSignin,authMiddleware,read);
// router.put('/user/:userId',requireSignin,isAuth,update);

// router.param("userId",userById);


module.exports = router;