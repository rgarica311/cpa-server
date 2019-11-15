const express = require('express');
const xss = require('xss');
const logger = require('./logger');

const TitlesService = require('./titles-service')

const titlesRouter = express.Router()
const bodyParser = express.json()

titlesRouter
  .route('/titles')
  .get((req, res, next) => {
    TitlesService.getBeginnerTitles(req.app.get('db'))
      .then(titles => {
        console.log('titels', titles)
        res.json(titles)
      })
  })

  module.exports = titlesRouter
