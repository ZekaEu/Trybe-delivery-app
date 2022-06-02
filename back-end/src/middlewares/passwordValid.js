// const { StatusCodes } = require('http-status-codes');

module.exports = async (req, res, next) => {
  const { password } = req.body;
  if (!password) {
    return res.status(400)
      .json({ message: 'password cannot be empty' });
  } 
  if (password.length < 6) {
    return res.status(400)
      .json({ message: 'password must be 6 character long' });
  }
  return next(); 
};