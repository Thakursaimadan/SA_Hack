// backend/middleware/auth.js
import jwt from 'jsonwebtoken';
import User from '../Schema/userSchema.js';
import dotenv from 'dotenv';

dotenv.config();

// ✅ Middleware to verify JWT and attach user to request
export const authenticate = async (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');  // Get Bearer token from header
    if (!token) return res.status(401).json({ message: 'Unauthorized: No token' });
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded._id);  // Access user by ID from decoded token
      if (!user) return res.status(401).json({ message: 'Unauthorized: Invalid user' });
  
      req.user = user; // Attach user to req object
      next();
    } catch (err) {
      return res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }
  };

// ✅ Middleware to check if user has a specific role
export const checkRole = (requiredRole) => {
  return (req, res, next) => {
    if (!req.user || req.user.role !== requiredRole) {
      return res.status(403).json({ message: 'Forbidden: Insufficient role' });
    }
    next();
  };
};
