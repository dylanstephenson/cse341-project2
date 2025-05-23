const express = require('express');
const router = express.Router();
const charController = require('../controllers/characters');
const { validateChar, validateObjectId } = require('../validators/charValidator')

// Get data from database
router.get('/', charController.getAll);
router.get('/:id', validateObjectId, charController.getSingle);

router.post('/', validateChar, charController.createChar);

router.put('/:id', [...validateObjectId, ...validateChar], charController.updateChar);

router.delete('/:id', validateObjectId, charController.deleteChar);

module.exports = router;