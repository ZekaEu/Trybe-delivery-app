require('dotenv').config();
const jwt = require('jsonwebtoken');
const fs = require('fs');

const SECRET = fs.readFileSync('jwt.evaluation.key', 'utf8');
console.log(JSON.stringify(SECRET));
const jwtconfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const generateToken = (userData) => {
  const token = jwt.sign({ data: userData }, SECRET, jwtconfig);
  return token;
};

module.exports = { generateToken };
