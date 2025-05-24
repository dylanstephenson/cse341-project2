const express = require('express');
const router = express.Router();
const bookController = require('../controllers/books');
const { validateBook, validateObjectId } = require('../validators/bookValidator')

// Get data from database
router.get('/', bookController.getAll);
router.get('/:id', validateObjectId, bookController.getSingle);

router.post('/', validateBook, bookController.createBook);

router.put('/:id', [validateObjectId, validateBook], bookController.updateBook);

router.delete('/:id', validateObjectId, bookController.deleteBook);

module.exports = router;