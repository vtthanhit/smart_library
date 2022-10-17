const express = require('express');
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const router = express.Router();
const { verifyToken, verifyTokenAdmin } = require('../middleware/auth');
const { REGEX_PASSWORD } = require('../constants/appConstants')

const User = require('../models/User');

router.get('/', verifyToken, async(req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password');
    if (!user) {
      return res.status(400).json({ success: false, message: 'User not found' });
    }
    res.json({ success: true, user })
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Internal SERVER' });
  }
});

router.post('/register', async (req, res) => {
  const { username, password, role, fullname, email, classname } = req.body;
  const regexPassword = REGEX_PASSWORD;
  if(!username || !password) {
    return res.status(400).json({ success: false, message: 'Missing username/password' });
  }

  if(!password.match(regexPassword)) {
    return res.status(400).json({ success: false, message: 'Incorrect password format' });
  }

  try {
    const user = await User.findOne({ username });

    if(user) {
      return res.status(400).json({ success: false, message: 'Username already' });
    }

    const hashPassword = await argon2.hash(password);
    const newUser = new User({
      username,
      fullname: fullname ? fullname : username,
      password: hashPassword,
      role,
      email,
      classname,
    });
    await newUser.save();
    const accessToken = jwt.sign({ userId: newUser._id, role: newUser.role }, process.env.JWT_SCREET);

    return res.status(200).json({ success: true, message: 'User created susscessfully', accessToken });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Internal SERVER' });
  }
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ success: false, message: 'Missing username/password' });
  }

  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ success: false, message: 'Incorrect username or password' });
    const passwordValid = await argon2.verify(user.password, password);
    if (!passwordValid) return res.status(400).json({ success: false, message: 'Incorrect username or password' });

    const accessToken = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SCREET);

    return res.status(200).json({ success: true, message: 'Login susscessfully', accessToken });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

router.put('/', verifyToken, async (req, res) => {
  const { fullname, password, confirm_password, email } = req.body;
  const regexPassword = REGEX_PASSWORD;

  if (password && !password.match(regexPassword)) {
    return res.status(400).json({ success: false, message: 'Sai định dạng mật khẩu' });
  }
  if (confirm_password !== password) {
    return res.status(400).json({ success: false, message: 'Mật khẩu không khớp' });
  }
  const hashPassword = await argon2.hash(password);

  try {
    let updatedUser = {
      fullname,
      password: hashPassword,
      email,
    };
    const userUpdateCondition = { _id: req.userId };

    updatedUser = await User.findOneAndUpdate(
      userUpdateCondition, updatedUser, { new: true }
    );

    if (!updatedUser)
      return res.status(404).json({ success: false, message: 'Không tìm thấy dữ liệu!' });
    return res.status(201).json({
      success: true,
      message: 'Đã cập nhật thông tin người dùng thành công!', user: updatedUser,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Internal SERVER!' });
  }
});

module.exports = router;
