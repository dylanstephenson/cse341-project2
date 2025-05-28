const express = require('express');
const router = express.Router();
const bookController = require('../controllers/books');
const { validateBook, validateObjectId } = require('../validators/bookValidator');
const { isAuthenticated } = require('../middleware/authenticate');

// Get data from database
router.get('/', bookController.getAll);
router.get('/:id', validateObjectId, bookController.getSingle);

router.post('/', [isAuthenticated, validateBook], bookController.createBook);

router.put('/:id', [isAuthenticated, validateObjectId, validateBook], bookController.updateBook);

router.delete('/:id', [isAuthenticated, validateObjectId], bookController.deleteBook);

module.exports = router;