require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const {NODE_ENV} = require('./config');

const navRouter = require('./nav-router');
const classDescRouter = require('./class-desc-router')
const titlesRouter = require('./titles-router')

const app = express();

app.use(morgan((NODE_ENV === 'production') ? 'tiny' : 'common', {
  skip: () => NODE_ENV === 'test'
}));

app.use(cors());
app.use(helmet());
app.use(navRouter);
app.use(classDescRouter);
app.use(titlesRouter);

app.use((error, req, res, next) => {
  let response;
  if (process.env.NODE_ENV === 'production') {
    response = {error: {message: 'server error'}};
  } else {
    response = {error};
  }
  res.status(500).json(response);
});

module.exports = app;
