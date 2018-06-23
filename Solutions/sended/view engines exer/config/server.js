const express = require('express')
const handlebars = require('express-handlebars')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const flash = require('express-flash')
const bodyParser = require('body-parser')
const path = require('path')

var sessionStore = new session.MemoryStore()

module.exports = (app) => {
  app.engine('hbs', handlebars({
    extname: '.hbs',
    layoutsDir: 'views/layouts',
    defaultLayout: 'main'
  }))

  app.set('view engine', 'hbs')

  app.use(cookieParser('secret'))

  app.use(session({
    cookie: { maxAge: 60000 },
    store: sessionStore,
    saveUninitialized: true,
    resave: 'true',
    secret: 'secret'
  }))
  app.use(flash())

  app.use(function (req, res, next) {
    // if there's a flash message in the session request, make it available in the response, then delete it
    res.locals.sessionFlash = req.session.sessionFlash
    delete req.session.sessionFlash
    next()
  })

  app.use(express.static(path.join(__dirname, '../content')))

  app.use(bodyParser.urlencoded({ extended: true }))
}
