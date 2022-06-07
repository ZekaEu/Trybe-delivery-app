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

module.exports = { createSale };
