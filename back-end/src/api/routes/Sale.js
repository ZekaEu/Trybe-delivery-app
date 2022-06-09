const { Router } = require('express');

const Sale = require('../controllers/Sale');
const { verifyToken } = require('../middlewares/auth');

const SaleRouter = Router();

SaleRouter.post(
  '/',
  Sale.createSale,
);

SaleRouter.get(
  '/',
  verifyToken,
  Sale.getSales,
  );
module.exports = SaleRouter;
