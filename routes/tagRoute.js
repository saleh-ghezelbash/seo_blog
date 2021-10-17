const express = require('express');

const {create,read,remove,list} = require('../controllers/tagController');
// const {userById} = require('../controllers/userController');
const {requireSignin,authMiddleware,adminMiddleware} = require('../controllers/authController');
const {runValidation} = require('../validators');
const {tagValidator} = require('../validators/tag');


const router = express.Router();

router.get('/', list);
router.get('/:slug', read);
router.delete('/:slug',requireSignin,adminMiddleware, remove);
router.post('/',tagValidator,runValidation,requireSignin,adminMiddleware, create);





module.exports = router;