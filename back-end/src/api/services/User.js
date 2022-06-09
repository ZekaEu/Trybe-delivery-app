const md5 = require('md5');
const { User } = require('../../database/models');
const { generateToken } = require('./auth');

const passwordValid = (user, password) => md5(password) === user.password;

const USER_NOT_FOUND = 'User not found!';

const findAll = async () => {
  const user = await User.findAll();
  if (!user) return { code: 404, data: { message: USER_NOT_FOUND } };
  return { code: 200, data: user };
};

const findUser = async (email, password) => {
  const user = await User.findOne({ where: { email } });
  if (!user) return { code: 404, data: { message: USER_NOT_FOUND } };
  if (!passwordValid(user, password)) { 
    return { code: 401, data: { message: 'Invalid email or password' } };
  }
  const token = generateToken(user);
  const safeUser = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    token,
  };
  return { code: 200, data: safeUser };
};

const findSellers = async () => {
  const sellers = await User.findAll({ where: { role: 'seller' } });
  if (!sellers) return { code: 404, data: { message: USER_NOT_FOUND } };
  return { code: 200, data: sellers };
};

const findOne = async (params) => User.findOne({ where: params });

const createUser = async ({ email, password, name, role }) => {
  const hashPass = md5(password);
  const uniqueEmail = await findOne({ email });
  if (uniqueEmail) {
    return { code: 409, data: { message: 'Email already in use!' } };
  }
  const { id } = await User.create({ name, email, password: hashPass, role });
  const token = generateToken({ id, name, email, role });
  const safeUser = { code: 201, data: { name, email, role, token } };
  return safeUser;
};

const deleteUser = async (id) => {
  const userExists = await findOne(id);
  if (!userExists) return { code: 404, data: { message: USER_NOT_FOUND } };

  await User.destroy({ where: id });

  return { code: 204, data: { message: 'Deleted user!' } };
};

module.exports = { findAll, findUser, findOne, createUser, deleteUser, findSellers };
