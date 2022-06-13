const { SalesProduct } = require('../../database/models');
const { Sale } = require('../../database/models');
const { Product } = require('../../database/models');

const createSalesProduct = async ({ saleId, productId, quantity }, t) => {
  const sale = await SalesProduct.create(
    { saleId, productId, quantity },
    { transaction: t },
  );
  return { code: 201, data: sale };
};

const returnOrder = (arr1, arr2) => arr1.map((product) => ({
      name: product.name,
      price: product.price,
      quantity: arr2.find(({ productId }) => productId === product.id).quantity,
    }));

const getProductsBySaleId = async (id) => {
  const sale = await Sale.findByPk(id);
  if (!sale) return { code: 404, data: { message: 'Sale not found!' } };
  const products = await SalesProduct.findAll({
    where: { saleId: id },
    attributes: ['productId', 'quantity'],
  });
  const eachProduct = products.map((product) => Product.findByPk(product.productId));
  const returnProduct = await Promise.all(eachProduct);
  const finalOrder = {
    products: returnOrder(returnProduct, products),
    totalPrice: sale.totalPrice,
    id: sale.id,
  };

  return { code: 200, data: finalOrder };
};

module.exports = { createSalesProduct, getProductsBySaleId };
