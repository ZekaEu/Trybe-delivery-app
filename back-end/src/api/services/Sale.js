const { Sale } = require('../../database/models');
const SalesProduct = require('./SalesProduct');

const findOne = async (params) => Sale.findOne({ where: params });

const createSale = async ({
  userId,
  sellerId,
  totalPrice,
  deliveryAddress,
  deliveryNumber,
  saleDate,
  status,
  arrProducts,
 }, t) => {
  const sale = await Sale.create({
    userId, sellerId, totalPrice, deliveryAddress, deliveryNumber, saleDate, status,
  }, { transaction: t });

  const salesProducts = arrProducts.map(({ productId, quantity }) =>
    SalesProduct.createSalesProduct({ saleId: sale.id, productId, quantity }, t),
  );

  await Promise.all(salesProducts);

  return { code: 201, data: sale };
};

module.exports = { findOne, createSale };
