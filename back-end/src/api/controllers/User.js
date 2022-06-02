const { StatusCodes } = require('http-status-codes');
const User = require('../services/User');

const findUser = async (req, res, next) => {
  const { email } = req.body;
  try {
    const user = await User.findUser(email);
    if (!user) return res.status(StatusCodes.NOT_FOUND).json({ message: 'User not found' });
    res.status(StatusCodes.OK).json(user);
  } catch (err) {
    next(err);
  }
};

const createUser = async (req, res, next) => {
  const { name, email, password, role } = req.body;
  try {
    const userCreated = await User.createUser({ name, email, password, role });
    return res.status(StatusCodes.CREATED).json(userCreated);
  } catch (err) {
    return next(err);
  }
};

module.exports = { findUser, createUser };