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

// router.post('/register', async (req, res) => {
//   const { username, password, fullname } = req.body;
//   const regexPassword = REGEX_PASSWORD;
//   if(!username || !password) {
//     return res.status(400).json({ success: false, message: 'Missing username/password' });
//   }

//   if(!password.match(regexPassword)) {
//     return res.status(400).json({ success: false, message: 'Incorrect password format' });
//   }

//   try {
//     const user = await User.findOne({ username });

//     if(user) {
//       return res.status(400).json({ success: false, message: 'Username already' });
//     }

//     const hashPassword = await argon2.hash(password);
//     const newUser = new User({
//       username,
//       fullname: fullname ? fullname : username,
//       password: hashPassword,
//     });
//     await newUser.save();
//     const accessToken = jwt.sign({ userId: newUser._id, role: newUser.role }, process.env.JWT_SCREET);

//     return res.status(200).json({ success: true, message: 'User created susscessfully', accessToken });
//   } catch (error) {
//     return res.status(500).json({ success: false, message: 'Internal SERVER' });
//   }
// });

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

module.exports = router;
