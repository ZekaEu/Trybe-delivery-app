const { Router } = require('express');

const Sale = require('../controllers/Sale');
const { verifyToken } = require('../middlewares/auth');

const SalesProduct = require('../controllers/SalesProduct');

const SaleRouter = Router();

SaleRouter.post(
  '/',
  Sale.createSale,
);

SaleRouter.get('/:id', SalesProduct.getOrderById);

SaleRouter.get(
  '/',
  verifyToken,
  Sale.getSales,
  );
  
module.exports = SaleRouter;
