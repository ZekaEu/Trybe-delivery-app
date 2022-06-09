const User = require('../services/User');

const findAll = async (_req, res, next) => {
  try {
    const { code, data } = await User.findAll();
    res.status(code).json(data);
  } catch (err) {
    next(err);
  }
};

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
    return res.status(code).json(data);
  } catch (err) {
    return next(err);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { code, data } = await User.deleteUser({ id });
    res.status(code).json(data);
  } catch (err) {
    next(err);
  }
};

const findAllSellers = async (_req, res, next) => {
  try {
    const { code, data } = await User.findSellers();
    res.status(code).json(data);
  } catch (err) {
    next(err);
  }
};

module.exports = { findAll, findUser, createUser, deleteUser, findAllSellers };
