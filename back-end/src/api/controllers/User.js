const User = require('../services/User');

const findUser = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findUser(email, password);
    const { code, data } = user;
    res.status(code).json(data);
  } catch (err) {
    next(err);
  }
};

module.exports = { findUser };