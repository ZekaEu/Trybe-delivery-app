const { Sale } = require('../../database/models');

const findOne = async (params) => Sale.findOne({ where: params });

const createSale = async ({
  userId,
  sellerId,
  totalPrice,
  deliveryAddress,
  deliveryNumber,
  saleDate,
  status,
 }) => {
  const sale = await Sale.create({
    userId, sellerId, totalPrice, deliveryAddress, deliveryNumber, saleDate, status,
  });
  return { code: 201, data: sale };;
};

module.exports = { findOne, createSale };