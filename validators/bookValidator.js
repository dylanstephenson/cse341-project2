const { body, param } = require('express-validator');

exports.validateBook = [
  body('name').notEmpty().isString().withMessage('Name is required.'),
  body('series').notEmpty().isString().withMessage('Series is required.'),
  body('entry').notEmpty().isInt().withMessage('Entry must be an int and is required.')
];

exports.validateObjectId = [
  param('id').isMongoId().withMessage('Invalid ID format.')
];