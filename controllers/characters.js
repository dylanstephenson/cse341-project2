const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;
const { validationResult } = require('express-validator');

const getAll = async (req, res) => {
    //#swagger.tags=['Contacts']
    try {
      const characters = await mongodb
        .getDatabase()
        .db()
        .collection('characters')
        .find()
        .toArray();
  
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(characters);
    } catch (err) {
      res.status(500).json({ message: err.message || 'Failed to retrieve characters.' });
    }
  };
  const getSingle = async (req, res) => {
    //#swagger.tags=['Contacts']
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
  
    try {
      const userId = new ObjectId(req.params.id);
      const character = await mongodb
        .getDatabase()
        .db()
        .collection('characters')
        .findOne({ _id: userId });
  
      if (!character) {
        return res.status(404).json({ message: 'Character not found' });
      }
  
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(character);
    } catch (err) {
      res.status(500).json({ message: err.message || 'Failed to fetch character' });
    }
  };
  
  // Create a new character
  const createChar = async (req, res) => {
    //#swagger.tags=['Contacts']
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
  
    try {
      const newChar = {
        firstName: req.body.firstName,
        alias: req.body.alias,
        powers: req.body.powers,
        alignment: req.body.alignment,
        planet: req.body.planet,
        books: req.body.books
      };
  
      const response = await mongodb
        .getDatabase()
        .db()
        .collection('characters')
        .insertOne(newChar);
  
      if (response.acknowledged) {
        res.status(201).send();
      } else {
        throw new Error('Insert not acknowledged');
      }
    } catch (err) {
      res.status(500).json({ message: err.message || 'Failed to create character' });
    }
  };
  
  // Update a character
  const updateChar = async (req, res) => {
    //#swagger.tags=['Contacts']
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
  
    try {
      const userId = new ObjectId(req.params.id);
      const char = {
        firstName: req.body.firstName,
        alias: req.body.alias,
        powers: req.body.powers,
        alignment: req.body.alignment,
        planet: req.body.planet,
        books: req.body.books
      };
  
      const response = await mongodb
        .getDatabase()
        .db()
        .collection('characters')
        .replaceOne({ _id: userId }, char);
  
      if (response.modifiedCount > 0) {
        res.status(204).send();
      } else {
        throw new Error('Character not updated');
      }
    } catch (err) {
      res.status(500).json({ message: err.message || 'Failed to update character' });
    }
  };
  
  // Delete a character
  const deleteChar = async (req, res) => {
    //#swagger.tags=['Contacts']
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
  
    try {
      const userId = new ObjectId(req.params.id);
      const response = await mongodb
        .getDatabase()
        .db()
        .collection('characters')
        .deleteOne({ _id: userId });
  
      if (response.deletedCount > 0) {
        res.status(204).send();
      } else {
        throw new Error('Character not deleted');
      }
    } catch (err) {
      res.status(500).json({ message: err.message || 'Failed to delete character' });
    }
  };

module.exports = { getAll, getSingle, createChar, updateChar, deleteChar };