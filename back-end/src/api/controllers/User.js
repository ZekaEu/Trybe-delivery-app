const status = require('http-status-codes');

const User = require('../services/User');

const findUser = async (req, res, next) => {
  const { email } = req.body;
  try {
    const user = await User.findUser(email);
    if (!user) return res.status(status.NOT_FOUND).json({ message: 'User not found' });
    res.status(status.OK).json(user);
  } catch (err) {
    next(err);
  }
};

module.exports = { findUser };