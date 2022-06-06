const { SalesProduct } = require('../../database/models');

const createSalesProduct = async ({ saleId, productId, quantity }, t) => {
  const sale = await SalesProduct.create(
    { saleId, productId, quantity },
    { transaction: t },
  );
  return { code: 201, data: sale };
};

module.exports = { createSalesProduct };