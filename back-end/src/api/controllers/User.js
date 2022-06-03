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

const createUser = async (req, res, next) => {
  const { name, email, password, role } = req.body;
  try {
    const { code, data } = await User.createUser({ name, email, password, role });
    console.log(data);
    return res.status(code).json(data);
  } catch (err) {
    return next(err);
  }
};

module.exports = { findUser, createUser };