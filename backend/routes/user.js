const express = require('express');
const argon2 = require('argon2');
const router = express.Router();

const { verifyTokenAdmin } = require('../middleware/auth');
const { DEFAULT_USER_PASSWORD, REGEX_PASSWORD } = require('../constants/appConstants')
const User = require('../models/User');

router.get('/', verifyTokenAdmin, async (req, res) => {
  try {
    const users = await User.find({role: 'STUDENT'});

    return res.status(200).json({ success: true, users });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Internal SERVER!' });
  }
});

router.post('/', verifyTokenAdmin, async (req, res) => {
  const { username, fullname } = req.body;
  const defaultPassword = DEFAULT_USER_PASSWORD;
  const hashPassword = await argon2.hash(defaultPassword);
  if (!username) return res.status(400).json({ success: false, message: 'Mã người dùng là bắt buộc!' });

  try {
    const user = await User.findOne({ username });
    if(user) {
      return res.status(400).json({ success: false, message: 'Mã người dùng đã tồn tại!' });
    }

    const newUser = new User({
      username,
      fullname: fullname ? fullname : username,
      password: hashPassword,
    });
    await newUser.save();

    return res.status(200).json({ success: true, message: 'Tạo mới người dùng thành công!', user: newUser });
  } catch (error) {
    return res.status(400).json({ success: false, message: 'Internal SERVER!' });
  }
});

router.put('/:id', verifyTokenAdmin, async (req, res) => {
  const { username, fullname, password } = req.body;
  const regexPassword = REGEX_PASSWORD;
  if(!username) {
    return res.status(400).json({ success: false, message: 'Tên người dùng là bắt buộc!' });
  }
  // if(password && !password.match(regexPassword)) {
  //   return res.status(400).json({ success: false, message: 'Sai định dạng mật khẩu' });
  // }
  const hashPassword = await argon2.hash(password);

  try {
    let updatedUser = {
      username,
      fullname,
      password: hashPassword,
    };
    const userUpdateCondition = { _id: req.params.id };

    updatedUser = await User.findOneAndUpdate(
      userUpdateCondition, updatedUser, { new: true }
    );

    if (!updatedUser)
      return res.status(404).json({ success: false, message: 'Không tìm thấy dữ liệu!' });
    return res.status(201).json({
      success: true,
      message: 'Đã cập nhật người dùng thành công!', user: updatedUser,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Internal SERVER!' });
  }
});

router.delete('/:id', verifyTokenAdmin, async (req, res) => {
  try {
    const userDeleteCondition = { _id: req.params.id };
    const deleteduser = await User.findByIdAndRemove(userDeleteCondition);

    if (!deleteduser)
      return res.status(404).json({ success: false, message: 'Không tìm thấy dữ liệu!' });
    return res.status(201).json({
      success: true,
      message: 'Xoá người dùng thành công!', user: deleteduser,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Internal SERVER!' });
  }
});

module.exports = router;
