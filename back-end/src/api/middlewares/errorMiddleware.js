// const { StatusCodes } = require('http-status-codes');

module.exports = async (err, req, res, _next) => res.status(500)
    .json({ message: err.message });