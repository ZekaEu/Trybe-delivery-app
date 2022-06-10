const { Sale } = require('../../database/models');
const SalesProduct = require('./SalesProduct');

const findOne = async (params) => Sale.findOne({ where: params });

const createSale = async ({
  userId,
  sellerId,
  totalPrice,
  deliveryAddress,
  deliveryNumber,
  status,
  arrProducts,
 }, t) => {
  const sale = await Sale.create({
    userId, sellerId, totalPrice, deliveryAddress, deliveryNumber, status,
  }, { transaction: t });

  const salesProducts = arrProducts.map(({ productId, quantity }) =>
    SalesProduct.createSalesProduct({ saleId: sale.id, productId, quantity }, t));

  await Promise.all(salesProducts);

  return { code: 201, data: sale };
};

const getOrderById = async (id) => {
  const order = await Sale.findByPk(id);
  if (!order) return { code: 404, data: { message: 'Not found!' } };
  return { code: 200, data: order };
};

module.exports = { findOne, createSale, getOrderById };
