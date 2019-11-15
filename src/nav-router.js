const express = require('express');
const xss = require('xss');
const logger = require('./logger');

const NavService = require('./nav-service');

const navRouter = express.Router();
const bodyParser = express.json();

const serializeNav = nav => ({
  id: nav.id,
  about: xss(nav.about),
  classes: nav.classes,
  adventures: xss(nav.adventures),
  events: nav.events,
  fundraisers: nav.fundraisers,
  calendar: nav.calendar
})

navRouter
  .route('/nav')
  .get((req, res, next) => {
    NavService.getAllNavElements(req.app.get('db'))
      .then(navs => {
        console.log('navs', navs)
        res.json(navs)
      })
      .catch(next);
  })
  .post(bodyParser, (req, res, next) => {
    console.log('post running');
    console.log('req.body', req.body);

    if (!req.body.linkName) {
      logger.error(`name is required`)
      return res.status(400).send(`name is required`)
    }

    if (req.body.subMenu !== null) {
      const {linkName, subMenu} = req.body;
      const newElement = {linkName, subMenu};
      console.log('submenu exists newelement:', newElement)
      NavService.getColumn(req.app.get('db'))
        .then(element => {
          let column = element.rows[0].colvalue;
          console.log('column', column)
          res.status(201)
          .json(xss(element));
          NavService.addTopNavLink(req.app.get('db'), newElement.linkName, column)
          .then(element => {
            console.log('newElement.subMenu[0]', newElement.subMenu[0])
            NavService.addSubMenu(req.app.get('db'), newElement.subMenu[0], column)
            .then(element => {
              console.log('element', element)
            })
          })
        }).catch(next);
    } else {
      console.log('no submenu provided')
      const newElement = req.body.linkName;
      NavService.getColumn(req.app.get('db'))
        .then(element => {
          let column = element.rows[0].colvalue;
          console.log('column', column)
          res.status(201)
          .json(xss(element));
          NavService.addTopNavLink(req.app.get('db'), newElement, column)
          .then(element => {
            console.log('res', res)
          })
        }).catch(next);

    }

  });
module.exports = navRouter;
