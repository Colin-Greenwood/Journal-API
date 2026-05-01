const express = require('express');
const router = express.Router();
const notes = require('../controllers/noteController');
const requireAuth = require('../middleware/authMiddleware');

router.use(requireAuth);

router.post('/', notes.createNote);
router.get('/', notes.getNotes);
router.get('/:id', notes.getNote);
router.put('/:id', notes.updateNote);
router.delete('/:id', notes.deleteNote);

module.exports = router;