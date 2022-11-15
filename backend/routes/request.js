const express = require('express');
const router = express.Router();
const { verifyToken, verifyTokenAdmin } = require('../middleware/auth');

const Request = require('../models/Request');
const Book = require("../models/Book");
const User = require("../models/User");

// admin
router.get('/admin/return', verifyTokenAdmin, async (req, res) => {
  try {
    const requests = await Request.find({type: 'RETURN'})
      .populate({path: 'books', populate: {path: 'book', model: 'books', select: ['name', 'author']}})
      .populate('user', ['username', 'fullname'])
      .populate('user_confirm', ['username', 'fullname']);

    if (!requests) return res.status(404).json({ success: false, message: 'Data not found' });

    return res.status(200).json({ success: true, requests });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Internal SERVER' });
  }
});

router.get('/admin/borrow', verifyTokenAdmin, async (req, res) => {
  try {
    const requests = await Request.find({type: 'BORROW'})
      .populate({path: 'books', populate: {path: 'book', model: 'books', select: ['name', 'author']}})
      .populate('user', ['username', 'fullname'])
      .populate('user_confirm', ['username', 'fullname']);

    if (!requests) return res.status(404).json({ success: false, message: 'Data not found' });

    return res.status(200).json({ success: true, requests });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Internal SERVER' });
  }
});

router.put('/admin/:id', verifyTokenAdmin, async (req, res) => {
  const { user, books, status } = req.body;
  const request = await Request.findById(req.params.id);

  try {
    let updatedRequest = {
      user,
      books,
      status: status || 'PENDING',
      user_confirm: req.userId,
    };
    const requestUpdateCondition = { _id: req.params.id };

    updatedRequest = await Request.findOneAndUpdate(
      requestUpdateCondition, updatedRequest, { new: true }
    )
      .populate({path: 'books', populate: {path: 'book', model: 'books', select: ['name', 'author']}})
      .populate('user_confirm', ['username', 'fullname'])
      .populate('user', ['username', 'fullname']);

    if (!updatedRequest)
      return res.status(404).json({ success: false, message: 'Data not found' });

    if (request.type === 'RETURN') {
      const book = await Book.findById(request.books.book);
      await Book.findByIdAndUpdate({_id: request.books.book}, { quantity: book.quantity + request.books.quantity }, { new: true });
      return res.status(201).json({
        success: true,
        message: 'Cập nhật thành công!', request: updatedRequest,
      });
    }
    return res.status(201).json({
      success: true,
      message: 'Cập nhật thành công!', request: updatedRequest,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

// Tra sach
router.put('/admin/return_book/:id', verifyTokenAdmin, async (req, res) => {
  const { type } = req.body;
  console.log(type)
  try {
    let updatedRequest = { type };
    const requestUpdateCondition = { _id: req.params.id };
    updatedRequest = await Request.findOneAndUpdate(
      requestUpdateCondition, updatedRequest, { new: true }
    )
      .populate({path: 'books', populate: {path: 'book', model: 'books', select: ['name', 'author']}})
      .populate('user_confirm', ['username', 'fullname'])
      .populate('user', ['username', 'fullname']);

    console.log(updatedRequest)
    if (!updatedRequest)
      return res.status(404).json({ success: false, message: 'Data not found' });

    const book = await Book.findById(updatedRequest.books.book);
    await Book.findByIdAndUpdate({_id: updatedRequest.books.book._id}, { quantity: book.quantity + updatedRequest.books.quantity }, { new: true });
    return res.status(201).json({
      success: true,
      message: 'Trả sách thành công!', request: updatedRequest,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

router.delete('/admin/:id', verifyTokenAdmin, async (req, res) => {
  try {
    const requestDeleteCondition = { _id: req.params.id };
    const deletedRequest = await Request.findByIdAndRemove(requestDeleteCondition);

    if (!deletedRequest)
      return res.status(404).json({ success: false, message: 'Data not found' });
    return res.status(201).json({
      success: true,
      message: 'Book deleted successfully', request: deletedRequest,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Internal SERVER' });
  }
});

router.post('/borrow', verifyTokenAdmin, async (req, res) => {
  const { books, user } = req.body;

  if (!books.book) return res.json({ success: false, message: 'You need to choose the book you want to borrow.' });

  try {
    const date = new Date();
    date.setDate(date.getDate() + 15)
    const newRequest = new Request({
      user,
      books: {
        book: books.book,
        quantity: books.quantity,
      },
      type: 'BORROW',
      status: 'ACCEPT',
      user_confirm: req.userId,
      dueDate: date,
    });
    await newRequest.save();
    const book = await Book.findById(req.body.books.book);
    await Book.findByIdAndUpdate({_id: req.body.books.book}, { quantity: book.quantity - books.quantity }, { new: true });
    return res.json({ success: true, message: 'Cho mượn sách thành công', request: newRequest });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

router.get('/borrow', verifyToken, async (req, res) => {
  try {
    const requests = await Request.find({ user: req.userId, type: 'BORROW' })
      .populate({path: 'books', populate: {path: 'book', model: 'books', select: ['name', 'author']}})
      .populate('user_confirm', ['username', 'fullname'])
      .populate('user', ['username', 'fullname']);

    if (!requests) return res.status(404).json({ success: false, message: 'Data not found' });

    return res.status(200).json({ success: true, requests });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Internal SERVER' });
  }
});

router.get('/return', verifyToken, async (req, res) => {
  try {
    const requests = await Request.find({ user: req.userId, type: 'RETURN' })
      .populate({path: 'books', populate: {path: 'book', model: 'books', select: ['name', 'author']}})
      .populate('user_confirm', ['username', 'fullname'])
      .populate('user', ['username', 'fullname']);

    if (!requests) return res.status(404).json({ success: false, message: 'Data not found' });

    return res.status(200).json({ success: true, requests });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Internal SERVER' });
  }
});

router.get('/:id', verifyToken, async (req, res) => {
  try {
    const request = await Request.find({ user: req.userId, _id: req.params.id })
      .populate('books', ['name'])
      .populate('user_confirm', ['username', 'fullname'])
      .populate('user', ['username', 'fullname']);

    if (!request) return res.status(404).json({ success: false, message: 'Data not found' });

    return res.status(200).json({ success: true, request });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Internal SERVER' });
  }
});

router.put('/borrow/:id', verifyToken, async (req, res) => {
  const { type, books } = req.body;
  const request = await Request.findById(req.params.id);
  const currentQuantity = request.books.quantity;

  if (type) {
    try {
      let updateType = {
        type,
        user_confirm: null,
        status: "PENDING",
      };
      const requestChangeCondition = { user: req.userId, _id: req.params.id };
      updateType = await Request.findOneAndUpdate(requestChangeCondition, updateType, { new: true })
        .populate({path: 'books', populate: {path: 'book', model: 'books', select: ['name', 'author']}})
        .populate('user_confirm', ['username', 'fullname'])
        .populate('user', ['username', 'fullname']);

      if (!updateType)
        return res.status(404).json({ success: false, message: 'Không tìm thấy dữ liệu' });
      return res.status(201).json({
          success: true,
          message: 'Trả thành công!', request: updateType,
        });
      } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
  }
  else {
    try {
      let updatedRequest = {
        books: {
          book: books.book,
          quantity: books.quantity,
        },
      };
      const requestUpdateCondition = { user: req.userId, _id: req.params.id };

      updatedRequest = await Request.findOneAndUpdate(
        requestUpdateCondition, updatedRequest, { new: true }
      )
        .populate({path: 'books', populate: {path: 'book', model: 'books', select: ['name', 'author']}})
        .populate('user_confirm', ['username', 'fullname'])
        .populate('user', ['username', 'fullname']);

      if (!updatedRequest)
        return res.status(404).json({ success: false, message: 'Data not found' });

      const book = await Book.findById(req.body.books.book);
      await Book.findByIdAndUpdate({_id: req.body.books.book}, { quantity: book.quantity + currentQuantity - books.quantity }, { new: true });
      return res.status(201).json({
        success: true,
        message: 'Cập nhật yêu cầu của bạn thành công!', request: updatedRequest,
      });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  }
});



router.delete('/borrow/:id', verifyToken, async (req, res) => {
  try {
    const requestDeleteCondition = { user: req.userId, _id: req.params.id };
    const request = await Request.findOne(requestDeleteCondition);
    if (!request) {
      return res.status(404).json({ success: false, message: 'Không tìm thấy dữ liệu!' });
    } else {
      if (request.type === 'BORROW') {
        const deletedRequest = await Request.findByIdAndRemove(requestDeleteCondition);
        const book = await Book.findById(request.books.book);
        await Book.findByIdAndUpdate({_id: request.books.book}, { quantity: book.quantity + request.books.quantity }, { new: true });
        return res.status(201).json({
          success: true,
          message: 'Xoá yêu cầu thành công!', request: deletedRequest,
        });
      } else {
        return res.status(400).json({ success: false, message: 'Không thể xoá yêu cầu trả!' });
      }
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
