const { Router } = require('express');

const Sale = require('../controllers/Sale');

const SaleRouter = Router();

SaleRouter.post(
  '/',
  Sale.createSale,
);
module.exports = SaleRouter;
