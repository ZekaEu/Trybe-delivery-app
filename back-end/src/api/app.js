const express = require('express');
const UserRouter = require('./routes/User');

const app = express();

app.use(express.json());
app.use('/login', UserRouter);

app.get('/coffee', (_req, res) => res.status(418).end());

module.exports = app;
