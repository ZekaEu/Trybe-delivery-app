// const { StatusCodes } = require('http-status-codes');

module.exports = async (err, req, res, _next) => res.status(501)
    .json({ message: err.message });