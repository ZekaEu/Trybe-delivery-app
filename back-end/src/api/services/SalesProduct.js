const { SalesProduct } = require('../../database/models');
const { Sale } = require('../../database/models');
const { Product } = require('../../database/models')

const createSalesProduct = async ({ saleId, productId, quantity }, t) => {
  const sale = await SalesProduct.create(
    { saleId, productId, quantity },
    { transaction: t },
  );
  return { code: 201, data: sale };
};

const getProductsBySaleId = async (id) => {
  const sale = await Sale.findByPk(id);
  if (!sale) return { code: 404, data: { message: 'Sale not found!' } };

  const products = await SalesProduct.findAll({
    where: { saleId: id },
    attributes: ['productId', 'quantity'],
  });
  
  const eachProduct = products.map((product) => Product.findByPk(product.productId));
  const returnProduct = await Promise.all(eachProduct);

  const returnOrder = returnProduct.map((product) => {
    return order = {
      name: product.name,
      price: product.price,
      quantity: products.find(({ productId }) => productId === product.id).quantity,
    };
  });

  const finalOrder = {
    products: returnOrder,
    totalPrice: sale.totalPrice,
    id: sale.id,
  };

  return { code: 200, data: finalOrder };
};

module.exports = { createSalesProduct, getProductsBySaleId };
