const { Router } = require('express');
const emailValid = require('../middlewares/emailValid');
const nameValid = require('../middlewares/nameValid');
const passwordValid = require('../middlewares/passwordValid');

const User = require('../controllers/User');

const UserRouter = Router();

UserRouter.get(
  '/users',
  User.findAll,
);

UserRouter.get(
  '/sellers',
  User.findAllSellers,
);

UserRouter.post('/',
  emailValid,
  passwordValid,
  User.findUser);

UserRouter.post(
  '/register',
  nameValid,
  emailValid,
  passwordValid,
  User.createUser,
);

UserRouter.delete(
  '/user/:id',
  User.deleteUser,
);

module.exports = UserRouter;
