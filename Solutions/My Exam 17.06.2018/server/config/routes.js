const controllers = require('../controllers')
const auth = require('./auth')

module.exports = (app) => {
  app.get('/', controllers.home.index)
  app.get('/index.html', controllers.home.index)
  app.get('/about', auth.isAuthenticated, controllers.home.about)

  app.get('/users/register', controllers.users.registerGet)
  app.post('/users/register', controllers.users.registerPost)
  app.get('/users/login', controllers.users.loginGet)
  app.post('/users/login', controllers.users.loginPost)
  app.post('/users/logout', controllers.users.logout)

  app.get('/article/create', auth.isAuthenticated, controllers.article.createGet)
  app.post('/article/create', auth.isAuthenticated, controllers.article.createPost)
  app.get('/article/all', controllers.article.getAll)
  app.get('/article/:id', controllers.article.getDeatils)
  app.get('/article/edit/:id', auth.isAuthenticated, controllers.article.getEdit)
  app.post('/article/edit', auth.isAuthenticated, controllers.article.postEdit)
  app.get('/article/history/:title', auth.isAuthenticated, controllers.article.getHistory)
  app.get('/admin/lock/:id', auth.isInRole('Admin'), controllers.article.lock)
  app.get('/admin/unlock/:id', auth.isInRole('Admin'), controllers.article.unlock)
  app.post('/article/search', auth.isAuthenticated, controllers.article.search)

  app.all('*', (req, res) => {
    res.status(404)
    res.send('404 Not Found!')
    res.end()
  })
}
