const jwt = require('jsonwebtoken');
// const Admin = require('../models/Admin'); // or your user model

const isAdmin = (req, res) => {
  const token = req.header('Authorization')?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: "Authentication token missing" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;

    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: "Access denied, not an admin" });
    }

    
  } catch (error) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
};



module.exports = isAdmin;
