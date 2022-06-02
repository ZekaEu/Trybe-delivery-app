const { StatusCodes } = require('http-status-codes');

module.exports = async (req, res, next) => {
  const { name } = req.body;
  if (!name) return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Name cannot be empty' });
  if (name.length < 12) {
    return res.status(StatusCodes.BAD_REQUEST)
      .json({ message: 'Name must be 12 characters long or more' });
  }
  return next(); 
};