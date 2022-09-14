const jwt = require('jsonwebtoken');

const verifyTokenAdmin = (req, res, next) => {
  const authHeader = req.header('Authorization');
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ success: false, message: 'Authenticate error.' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SCREET);
    const role = decoded.role;
    if (role === 'ADMIN') { 
      req.userId = decoded.userId;
      next();
    } else { 
      return res.status(403).json({ success: false, message: 'Forbidden error' });
    }
  } catch (error) {
    return res.status(403).json({ success: false, message: 'Internal SERVER' });
  }
}

const verifyToken = (req, res, next) => {
  const authHeader = req.header('Authorization');
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ success: false, message: 'Authenticate error.' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SCREET);
      req.userId = decoded.userId;
      next();
  } catch (error) {
    return res.status(403).json({ success: false, message: 'Forbidden error' });
  }
}

module.exports = { verifyTokenAdmin, verifyToken };