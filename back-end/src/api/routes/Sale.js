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

SaleRouter.get('/sale/:id', Sale.getSingleSale);

module.exports = SaleRouter;
