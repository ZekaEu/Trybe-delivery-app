const { Product } = require('../../database/models');

const findProducts = async () => {
  const products = await Product.findAll();
  return { code: 200, data: products };
};

module.exports = { findProducts };
