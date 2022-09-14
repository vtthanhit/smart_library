const express = require('express');
const router = express.Router();
const { verifyTokenAdmin } = require('../middleware/auth');

const User = require('../models/User');

router.get('/', verifyTokenAdmin, async (req, res) => {
  try {
    const users = await User.find();

    return res.status(200).json({ success: true, users });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Internal SERVER' });
  }
});

router.post('/', verifyTokenAdmin, async (req, res) => {
  const { username, fullname } = req.body;
  const defaultPassword = process.env.DEFAULT_USER_PASSWORD;

  if (!username) return res.status(400).json({ success: false, message: 'Missing username.' });

  try {
    const newUser = new User({
      username,
      fullname: fullname ? fullname : username,
      password: defaultPassword,
    });
    await newUser.save();

    return res.status(200).json({ success: true, message: 'User created susscessfully', user: newUser });
  } catch (error) {
    return res.status(400).json({ success: false, message: 'Internal SERVER' });
  }
});

router.patch('/:id', verifyTokenAdmin, async (req, res) => {
  const { username, fullname } = req.body;

  try {
    let updatedUser = { 
      username,  
      fullname,
    };
    const userUpdateCondition = { _id: req.params.id };

    updatedUser = await User.findOneAndUpdate(
      userUpdateCondition, updatedUser, { new: true }
    );

    if (!updatedUser) 
      return res.status(404).json({ success: false, message: 'Data not found' });
    return res.status(201).json({ 
      success: true, 
      message: 'User updated successfully', user: updatedUser,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Internal SERVER' });
  }
});

router.delete('/:id', verifyTokenAdmin, async (req, res) => {
  try {
    const userDeleteCondition = { _id: req.params.id };
    const deleteduser = await User.findByIdAndRemove(userDeleteCondition);

    if (!deleteduser) 
      return res.status(404).json({ success: false, message: 'Data not found' });
    return res.status(201).json({ 
      success: true, 
      message: 'Category deleted successfully', user: deleteduser,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Internal SERVER' });
  }
});

module.exports = router;