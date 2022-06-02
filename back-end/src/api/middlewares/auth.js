require('dotenv').config();
// const { StatusCodes } = require('http-status-codes');
const jwt = require('jsonwebtoken');

const SECRET = process.env.JWT_SECRET;

const verifyToken = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }
    const { data } = jwt.verify(token, SECRET);
    if (!data) {
      return res.status(498).json({ message: 'Expired or invalid token' });
    }
    next();
  } catch (e) {
    return { message: 'Expired or invalid token' };
  } 
};

module.exports = { verifyToken };