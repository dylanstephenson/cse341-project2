const express = require('express');
const router = express.Router();
const charController = require('../controllers/characters');
const { validateChar, validateObjectId } = require('../validators/charValidator');
const { isAuthenticated } = require('../middleware/authenticate');

// Get data from database
router.get('/', charController.getAll);
router.get('/:id', validateObjectId, charController.getSingle);

router.post('/', [isAuthenticated, validateChar], charController.createChar);

router.put('/:id', [isAuthenticated, validateObjectId, validateChar], charController.updateChar);

router.delete('/:id', [isAuthenticated, validateObjectId], charController.deleteChar);

module.exports = router;