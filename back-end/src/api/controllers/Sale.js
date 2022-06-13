const Sequelize = require('sequelize');
const Sale = require('../services/Sale');
const config = require('../../database/config/config');

const createSale = async (req, res, next) => {
  const request = req.body;
  const sequelize = new Sequelize(config.development);
  const t = await sequelize.transaction();
  try {
    const { code, data } = await Sale.createSale(request, t);

    await t.commit();

    return res.status(code).json(data);
  } catch (err) {
    await t.rollback();
    return next(err);
  }
};

const getSales = async (_req, res, next) => {
  try {
    const { code, data } = await Sale.getSales();
    return res.status(code).json(data);
  } catch (err) {
    return next(err);
  }
};

const getSingleSale = async (req, res, next) => {
  const { id } = req.params;
  try {
    const sale = await Sale.findOne({ id });
    if (!sale) return res.status(404).json({ message: 'Not found!' });
    return res.status(200).json(sale);
  } catch (err) {
    return next(err);
  }
};

module.exports = { createSale, getSales, getSingleSale };
