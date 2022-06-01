require('dotenv').config();
const jwt = require('jsonwebtoken');

const SECRET = process.env.JWT_SECRET;

const jwtconfig = {
  expiresIn: '30d',
  algorithm: 'HS256',
};

const generateToken = (userData) => {
  const token = jwt.sign({ data: userData }, SECRET, jwtconfig);
  return token;
};

const verifyToken = (token) => {
  try {
    const { data } = jwt.verify(token, SECRET);
    return data;
  } catch (e) {
    return { message: 'Expired or invalid token' };
  }
};

module.exports = {
  generateToken,
  verifyToken,
};
