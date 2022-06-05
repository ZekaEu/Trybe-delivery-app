require('dotenv').config();
const fs = require('fs');
const jwt = require('jsonwebtoken');

const SECRET = fs.readFileSync('jwt.evaluation.key', 'utf8');

const verifyToken = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(400).json({ message: 'No token provided' });
    }
    const { data } = jwt.verify(token, SECRET);
    if (!data) {
      return res.status(400).json({ message: 'Expired or invalid token' });
    }
    next();
  } catch (e) {
    return { message: 'Expired or invalid token' };
  } 
};

module.exports = { verifyToken };