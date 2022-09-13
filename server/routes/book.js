const express = require('express');
const router = express.Router();
const { verifyTokenAdmin } = require('../middleware/auth');

const Book = require('../models/Book');

router.post('/', verifyTokenAdmin, async (req, res) => {
  const { name, author, description, quantity, category } = req.body;

  if(!name) return res.status(400).json({ success: false, message: 'Book name is require.' });
  if(!author) return res.status(400).json({ success: false, message: 'Author is require.' });
  if(!category) return res.status(400).json({ success: false, message: 'Category is require.' });

  try {
    const newBook = new Book({
      name,
      author,
      description,
      quantity,
      category,
    });
    await newBook.save();
    return res.status(200).json({ success: true, message: 'Create new book successfully.', book: newBook });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Internal SERVER' });
  }
});

router.get('/', async (req, res) => {
  try {
    const books = await Book.find().populate('category', ['name']);

    return res.status(200).json({ success: true, books });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Internal SERVER' });
  }
});

router.get('/category/:categoryId', async (req, res) => {
  try {
    const books = await Book.find({ category: req.params.categoryId }).populate('category', ['name']);

    return res.status(200).json({ success: true, books });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

router.patch('/:id', verifyTokenAdmin, async (req, res) => {
  const { name, author, description, quantity, category } = req.body;

  try {
    let updatedBook = {
      name,
      author,
      description,
      quantity,
      category,
    };
    const bookUpdateCondition = { _id: req.params.id };

    updatedBook = await Book.findOneAndUpdate(
      bookUpdateCondition, updatedBook, { new: true }
    );

    if (!updatedBook) 
      return res.status(404).json({ success: false, message: 'Data not found' });
    return res.status(201).json({ 
      success: true, 
      message: 'Book updated successfully', book: updatedBook,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Internal SERVER' });
  }
});

router.delete('/:id', verifyTokenAdmin, async (req, res) => {
  try {
    const bookDeleteCondition = { _id: req.params.id };
    const deletedBook = await Book.findByIdAndRemove(bookDeleteCondition);

    if (!deletedBook) 
      return res.status(404).json({ success: false, message: 'Data not found' });
    return res.status(201).json({ 
      success: true, 
      message: 'Book deleted successfully', book: deletedBook,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Internal SERVER' });
  }
});

module.exports = router;