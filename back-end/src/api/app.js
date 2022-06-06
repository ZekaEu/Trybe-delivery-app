const express = require('express');
const productRouter = require('./routes/Product');
const UserRouter = require('./routes/User');
const SaleRouter = require('./routes/Sale');

const app = express();

app.use(express.json());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
  res.header('Access-Control-Allow-Headers', '*');
  next();
});
app.use('/login', UserRouter);
app.use('/customer/products', productRouter);
app.use('/sales', SaleRouter);

app.get('/coffee', (_req, res) => res.status(418).end());

module.exports = app;
