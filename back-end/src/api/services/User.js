const md5 = require('md5');
const { User } = require('../../database/models');
const { generateToken } = require('./auth');

const passwordValid = (user, password) => md5(password) === user.password;

const findUser = async (email, password) => {
  const user = await User.findOne({ where: { email } });
  if (!user) return { code: 404, data: { message: 'User not found!' } };
  if (!passwordValid(user, password)) { 
    return { code: 401, data: { message: 'Invalid email or password' } };
  }
  const token = generateToken(user);
  const safeUser = {
    id: user.id,
    name: user.name,
    role: user.role ? user.role : '',
    token,
  };
  return { code: 200, data: safeUser };
};

const findOne = async (params) => User.findOne({ where: params });

const createUser = async ({ email, password, name, role }) => {
  const hashPass = md5(password);
  const uniqueEmail = await findOne({ email });
  if (uniqueEmail) {
    return { code: 409, data: { message: 'Email already in use!' } };
  }
  await User.create({ name, email, password: hashPass, role });
  const safeUser = { code: 201, data: { name, email, role } };
  return safeUser;
};

module.exports = { findUser, findOne, createUser };