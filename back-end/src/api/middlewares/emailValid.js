// const { StatusCodes } = require('http-status-codes');

const User = require('../services/User');

module.exports = async (req, res, next) => {
  const { email } = req.body;
  const emailRegex = /.+@.+\.com/i; 
  if (!email) return res.status(400).json({ message: 'Email cannot be empty' });
  if (!emailRegex.test(email)) {
    return res.status(400)
      .json({ message: 'Email not valid' });
  }
  const uniqueEmail = await User.findOne({ email });
  if (uniqueEmail) {
    return res.status(409)
      .json({ message: 'Email already in use!' });
  }
  return next(); 
};