require('dotenv').config();
const jwt = require('jsonwebtoken');

const SECRET = process.env.JWT_SECRET;

const jwtconfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const generateToken = (userData) => {
  const token = jwt.sign({ data: userData }, SECRET, jwtconfig);
  return token;
};

module.exports = { generateToken };
