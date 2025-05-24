const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;
const { validationResult } = require('express-validator');

const getAll = async (req, res) => {
    //#swagger.tags=['Contacts']
    try {
      const books = await mongodb
        .getDatabase()
        .db()
        .collection('books')
        .find()
        .toArray();
  
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(books);
    } catch (err) {
      res.status(500).json({ message: err.message || 'Failed to retrieve books.' });
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
      const book = await mongodb
        .getDatabase()
        .db()
        .collection('books')
        .findOne({ _id: userId });
  
      if (!book) {
        return res.status(404).json({ message: 'book not found' });
      }
  
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(book);
    } catch (err) {
      res.status(500).json({ message: err.message || 'Failed to fetch book' });
    }
  };
  
  // Create a new book
  const createBook = async (req, res) => {
    //#swagger.tags=['Contacts']
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
  
    try {
      const newBook = {
        name: req.body.name,
        series: req.body.series,
        entry: req.body.entry
      };
  
      const response = await mongodb
        .getDatabase()
        .db()
        .collection('books')
        .insertOne(newBook);
  
      if (response.acknowledged) {
        res.status(201).send();
      } else {
        throw new Error('Insert not acknowledged');
      }
    } catch (err) {
      res.status(500).json({ message: err.message || 'Failed to create book' });
    }
  };
  
  // Update a book
  const updateBook = async (req, res) => {
    //#swagger.tags=['Contacts']
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
  
    try {
      const userId = new ObjectId(req.params.id);
      const book = {
        name: req.body.name,
        series: req.body.series,
        entry: req.body.entry
      };
  
      const response = await mongodb
        .getDatabase()
        .db()
        .collection('books')
        .replaceOne({ _id: userId }, book);
  
      if (response.modifiedCount > 0) {
        res.status(204).send();
      } else {
        throw new Error('book not updated');
      }
    } catch (err) {
      res.status(500).json({ message: err.message || 'Failed to update book' });
    }
  };
  
  // Delete a book
  const deleteBook = async (req, res) => {
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
        .collection('books')
        .deleteOne({ _id: userId });
  
      if (response.deletedCount > 0) {
        res.status(204).send();
      } else {
        throw new Error('book not deleted');
      }
    } catch (err) {
      res.status(500).json({ message: err.message || 'Failed to delete book' });
    }
  };

module.exports = { getAll, getSingle, createBook, updateBook, deleteBook };