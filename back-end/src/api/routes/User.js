const { Router } = require('express');
const emailValid = require('../../middlewares/emailValid');
const nameValid = require('../../middlewares/nameValid');
const passwordValid = require('../../middlewares/passwordValid');

const User = require('../controllers/User');

const UserRouter = Router();

UserRouter.post('/', User.findUser);
UserRouter.post(
  '/register',
  nameValid,
  emailValid,
  passwordValid,
  User.createUser,
  );
module.exports = UserRouter;