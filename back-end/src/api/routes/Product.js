const { Router } = require('express');
const Product = require('../controllers/Product');
// const { verifyToken } = require('../middlewares/auth');

const productRouter = Router();

productRouter.get('/', Product.findProducts);

module.exports = productRouter;
