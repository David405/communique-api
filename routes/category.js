const express = require('express');
const router = express.Router();

const { addCategory, viewAll, viewPostsByCategory, deleteCategory } = require('../controllers/category');

const { auth } = require('../middleware/auth');

router.post('/add', auth, addCategory);
router.get('/all', viewAll);
router.get('/:category', viewPostsByCategory);
router.delete('/:title/delete', deleteCategory);

module.exports = router;