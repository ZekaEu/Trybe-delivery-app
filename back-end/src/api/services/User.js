const md5 = require('md5');
// const { StatusCodes } = require('http-status-codes');
const { User } = require('../../database/models');
const { generateToken } = require('./auth');

const passwordValid = (user, password) => md5(password) === user.password;

const findUser = async (email, password) => {
  const user = await User.findOne({ where: { email } });
  if (!user || !passwordValid(user, password)) { 
    return { code: 400, data: { message: 'Invalid email or password' } };
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

module.exports = { findUser };