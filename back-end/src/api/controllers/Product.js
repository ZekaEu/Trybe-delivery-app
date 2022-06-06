const Product = require('../services/Product');

const findProducts = async (_req, res, next) => {
  try {
    const { code, data } = await Product.findProducts();
    return res.status(code).json(data);
  } catch (err) {
    return next(err);
  }
};

module.exports = { findProducts };
