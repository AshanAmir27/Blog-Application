// middleware/authenticateToken.js
import jwt from 'jsonwebtoken';

const JWT_SECRET = 'your-secret-key';  // Use a secure secret key

export const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Extract token from "Authorization" header

  if (!token) return res.status(401).json({ message: 'Access denied' });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid token' });
    req.user = user;  // Attach user data to the request
    next();
  });
};
