const express = require('express');
const router = express.Router();

const { register, login, profile, viewPostsByAuthor, viewOwnPosts } = require('../controllers/users');
const { auth } = require('../middleware/auth');

router.post('/register', register);
router.post('/login', login);
router.get('/profile', auth, profile);
router.get('/:author', viewPostsByAuthor);
router.get('/posts/me', auth, viewOwnPosts)

module.exports = router;