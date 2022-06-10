const { Router } = require('express');

const Sale = require('../controllers/Sale');

const SalesProduct = require('../controllers/SalesProduct');

const SaleRouter = Router();

SaleRouter.post(
  '/',
  Sale.createSale,
);

SaleRouter.get('/:id', SalesProduct.getOrderById);

module.exports = SaleRouter;
