import jwt from 'jsonwebtoken';

function authenticate(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1]; // Or use cookies
  if (!token) return res.status(401).json({ msg: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // contains _id, role, email, etc.
    next();
  } catch (err) {
    res.status(403).json({ msg: "Invalid Token" });
  }
}
