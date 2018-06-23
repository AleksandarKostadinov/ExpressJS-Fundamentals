const homeController = require('../controllers/home-controller')
const bookController = require('../controllers/books-controller')

module.exports = (app) => {
  app.get('/', homeController.getIndex)
  app.get('/add', bookController.getAddBook)
  app.post('/add', bookController.postAddBook)
  app.get('/all/:page', bookController.getAllBooks)
  app.get('/details/:id', bookController.getDetails)
}
