const express = require('express');
const router = express.Router();
const { verifyToken, verifyTokenAdmin } = require('../middleware/auth');

const Request = require('../models/Request');

// admin

router.get('/admin', verifyTokenAdmin, async (req, res) => {
  try {
    const requests = await Request.find()
      .populate('books', ['name'])
      .populate('user', ['username', 'fullname']);
    
    if (!requests) return res.status(404).json({ success: false, message: 'Data not found' });

    return res.status(200).json({ success: true, requests });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Internal SERVER' });
  }
});

router.patch('/admin/:id', verifyTokenAdmin, async (req, res) => {
  const { user, books, status } = req.body;

  try {
    let updatedRequest = {
      user,
      books,
      status: status || 'PENDDING',
    };
    const requestUpdateCondition = { _id: req.params.id };

    updatedRequest = await Request.findOneAndUpdate(
      requestUpdateCondition, updatedRequest, { new: true }
    )
      .populate('books', ['name'])
      .populate('user', ['username', 'fullname']);

    if (!updatedRequest) 
      return res.status(404).json({ success: false, message: 'Data not found' });
    return res.status(201).json({ 
      success: true, 
      message: 'Your request updated successfully', request: updatedRequest,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Internal SERVER' });
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

// student

router.post('/', verifyToken, async (req, res) => {
  const { books } = req.body;
  if (!books) return res.json({ success: false, message: 'You need to choose the book you want to borrow.' });
  try {
    const newRequest = new Request({
      user: req.userId,
      books
    });
    await newRequest.save();
    return res.json({ success: true, message: 'Create new request successfully', request: newRequest });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Internal SERVER' });
  }
});

router.get('/', verifyToken, async (req, res) => {
  try {
    const requests = await Request.find({ user: req.userId })
      .populate('books', ['name'])
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
      .populate('user', ['username', 'fullname']);

    if (!requests) return res.status(404).json({ success: false, message: 'Data not found' });

    return res.status(200).json({ success: true, request });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Internal SERVER' });
  }
});

router.patch('/:id', verifyToken, async (req, res) => {
  const { books } = req.body;

  try {
    let updatedRequest = {
      books
    };
    const requestUpdateCondition = { user: req.userId, _id: req.params.id };

    updatedRequest = await Request.findOneAndUpdate(
      requestUpdateCondition, updatedRequest, { new: true }
    )
      .populate('books', ['name'])
      .populate('user', ['username', 'fullname']);

    if (!updatedRequest) 
      return res.status(404).json({ success: false, message: 'Data not found' });
    return res.status(201).json({ 
      success: true, 
      message: 'Your request updated successfully', request: updatedRequest,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Internal SERVER' });
  }
});

router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const requestDeleteCondition = { user: req.userId, _id: req.params.id };
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

module.exports = router;