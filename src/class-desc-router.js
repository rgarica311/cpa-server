const express = require('express');
const xss = require('xss');
const logger = require('./logger');

const ClassDescService = require('./class-desc-service')

const classDescRouter = express.Router()
const bodyParser = express.json()

classDescRouter
  .route('/classdesc')
  .get((req, res, next) => {
    ClassDescService.getBeginnerClassDescs(req.app.get('db'))
      .then(classes => {
        console.log('classes', classes)
        res.json(classes)
      })
  })

  module.exports = classDescRouter
