const { Router } = require('express');

const { findUser } = require('../controllers/User');

const UserRouter = Router();

UserRouter.post('/', findUser);

module.exports = UserRouter;