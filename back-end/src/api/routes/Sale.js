const { Router } = require('express');

const Sale = require('../controllers/Sale');

const UserRouter = Router();

UserRouter.post(
  '/',
  Sale.createSale,
);
module.exports = UserRouter;