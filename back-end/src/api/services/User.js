const md5 = require('md5');
const { User } = require('../../database/models');
const { generateToken } = require('./auth');

const passwordValid = (user, password) => md5(password) === user.password;

const findUser = async (email, password) => {
  const user = await User.findOne({ where: { email } });
  if (!user || !passwordValid(user, password)) { 
    return { code: 401, data: { message: 'Invalid email or password' } };
  }
  const token = generateToken(user);
  const safeUser = {
    id: user.id,
    name: user.name,
    role: user.role,
    token,
  };
  return { code: 200, data: safeUser };
};

const createUser = async ({ email, password, name, role }) => {
  const hashPass = md5(password);
  await User.create({ name, email, password: hashPass, role });
  const safeUser = { name, email, role };
  return safeUser;
};

module.exports = { findUser, createUser };