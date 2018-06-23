const env = 'development'

const express = require('express')
const settings = require('./config/settings')[env]
const database = require('./config/databese')
const routes = require('./config/routes')
const server = require('./config/server')

database(settings)

const app = express()

server(app)

routes(app)

const port = settings.port

app.listen(port, () => {
  console.log(`App is running on port ${port}...`)
})
