const md5 = require('md5');
const { User } = require('../../database/models');

const findUser = async (email) => {
  const user = await User.findOne({ where: { email } });
  return user;
};

const createUser = async ({ email, password, name, role }) => {
  const hashPass = md5(password);
  await User.create({ name, email, password: hashPass, role });
  const safeUser = { name, email, role };
  return safeUser;
};

module.exports = { findUser, createUser };