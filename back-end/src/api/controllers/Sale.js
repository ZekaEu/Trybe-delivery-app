const Sale = require('../services/Sale');

const createSale = async (req, res, next) => {
  const request = req.body;
  try {
    const { code, data } = await Sale.createSale(request);
    return res.status(code).json(data);
  } catch (err) {
    return next(err);
  }
};

module.exports = { createSale };