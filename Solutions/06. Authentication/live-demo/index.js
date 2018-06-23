const express = require('express')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const handlebars = require('express-handlebars')

const products = [
  {
    name: 'Apple',
    price: 3
  },
  {
    name: 'Banana',
    price: 23
  },
  {
    name: 'Kiwi',
    price: 15
  }
]

const app = express()

app.engine('.hbs', handlebars({
  extname: '.hbs'
}))
app.set('view engine', '.hbs')

app.use(express.static('./content'))

app.use(cookieParser())
app.use(session({
  secret: 'secret'
}))

app.get('/', (req, res) => {
  const itemsCount = req.session.cart ? req.session.cart.length : 0
  res.render('index', { products, itemsCount })
})

app.get('/add/:id', (req, res) => {
  if (req.session.cart === undefined) {
    req.session.cart = []
  }

  const product = products[Number(req.params.id)]
  req.session.cart.push(product)

  res.redirect('/')
})

app.get('/cart', (req, res) => {
  let products = req.session.cart
  let itemsCount = 0
  let total = 0
  if (products === undefined) {
    products = []
  } else {
    itemsCount = products.length
  }
  total = products
    .map(p => Number(p.price))
    .reduce((a, b) => a + b, 0)

  res.render('cart', { products, itemsCount, total })
})

app.get('/remove/:id', (req, res) => {
  const id = Number(req.params.id)

  req.session.cart.splice(id, 1)
  res.redirect('/cart')
})

app.get('/readSession', (req, res) => {
  res.json(req.session)
})

const port = 5000

app.listen(port, () => {
  console.log(`App is up and running on port ${port}...`)
})
