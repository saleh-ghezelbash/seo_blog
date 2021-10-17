const express = require('express');
const router = express.Router();
const {
    create,
    list,
    listAllBlogsCategoriesTags,
    read,
    remove,
    update,
    photo,
    listRelated,
    listSearch
} = require('../controllers/blogController');

const { requireSignin, adminMiddleware } = require('../controllers/authController');

router.post('/', requireSignin, adminMiddleware, create);
router.get('/', list);
router.post('/blogs-categories-tags', listAllBlogsCategoriesTags);
router.get('/:slug', read);
router.delete('/:slug', requireSignin, adminMiddleware, remove);
router.put('/:slug', requireSignin, adminMiddleware, update);
router.get('/photo/:slug', photo);
router.post('/related', listRelated);
router.get('/search', listSearch);

module.exports = router;