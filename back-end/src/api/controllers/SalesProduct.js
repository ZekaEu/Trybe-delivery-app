const SalesProducts = require('../services/SalesProduct');

const getOrderById = async (req, res, next) => {
  const { id } = req.params;
  try {
  const { code, data } = await SalesProducts.getProductsBySaleId(id);
  
  return res.status(code).json(data);
  } catch (err) {
    return next(err);
  }
};

module.exports = { getOrderById };
