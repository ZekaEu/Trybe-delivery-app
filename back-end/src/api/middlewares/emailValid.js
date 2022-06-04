// const { StatusCodes } = require('http-status-codes');

module.exports = async (req, res, next) => {
  const { email } = req.body;
  const emailRegex = /.+@.+\.com/i; 
  if (!email) return res.status(400).json({ message: 'Email cannot be empty' });
  if (!emailRegex.test(email)) {
    return res.status(400)
      .json({ message: 'Email not valid' });
  }
  return next(); 
};