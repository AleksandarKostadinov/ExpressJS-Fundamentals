const Book = require('../data/Book')

module.exports = {
  getIndex: (req, res) => {
    Book
      .count()
      .then(count => {
        res.render('index', { count, successMessage: req.flash('successMessage') })
      })
  }
}
