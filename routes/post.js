const express = require('express');
const router = express.Router();
const multer  = require('multer');
const upload = multer({ dest: 'uploads' })

const { createPost, viewSinglePost, deletePost } = require('../controllers/post');

const { auth } = require('../middleware/auth');

router.post('/create', auth, upload.any(), createPost);
router.get('/:title', viewSinglePost);
router.delete('/:title/delete', deletePost);

module.exports = router;