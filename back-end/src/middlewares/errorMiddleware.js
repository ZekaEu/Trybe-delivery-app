const { StatusCodes } = require('http-status-codes');

module.exports = async (err, req, res, _next) => res.status(StatusCodes.INTERNAL_SERVER_ERROR)
    .json({ message: err.message });