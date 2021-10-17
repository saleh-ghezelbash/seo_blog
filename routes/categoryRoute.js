const express = require('express');

const {create,read,remove,list} = require('../controllers/categoryController');
// const {userById} = require('../controllers/userController');
const {requireSignin,authMiddleware,adminMiddleware} = require('../controllers/authController');
const {runValidation} = require('../validators');
const {categoryValidator} = require('../validators/category');


const router = express.Router();

router.get('/', list);
router.get('/:slug', read);
router.delete('/:slug',requireSignin,adminMiddleware, remove);
router.post('/',categoryValidator,runValidation,requireSignin,adminMiddleware, create);





module.exports = router;