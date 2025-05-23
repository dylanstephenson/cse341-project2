const { body, param } = require('express-validator');

exports.validateChar = [
  body('firstName').notEmpty().isString().withMessage('First name is required.'),
  body('alias').notEmpty().isString().withMessage('Alias is required.'),
  body('powers').notEmpty().isString().withMessage('Powers are required.'),
  body('alignment').notEmpty().isString().withMessage('Character alignment is required.'),
  body('planet').notEmpty().isString().withMessage('Planet is required'),
  body('books').notEmpty().isString().withMessage('Books are required')
];

exports.validateObjectId = [
  param('id').isMongoId().withMessage('Invalid ID format.')
];