const Book = require('../data/Book')

module.exports = {
  getAddBook: (req, res) => {
    res.render('books/add')
  },

  postAddBook: (req, res) => {
    let book = req.body

    if (!book.title || !book.imageUrl) {
      book.error = 'Title and Image URL are required!'
      res.render('books/add', book)
    }

    Book
      .create({
        title: book.title,
        author: book.author,
        releaseDate: new Date(book.releaseDate),
        imageUrl: book.imageUrl
      })
      .then(() => {
        req.flash('successMessage', 'You successfully added a book!')
        res.redirect('/')
      })
  },

  getAllBooks: (req, res) => {
    let page = +req.params.page - 1
    let pageSize = 5

    Book
      .count()
      .then(count => {
        Book
          .find()
          .sort('-releaseDate')
          .skip((pageSize * page))
          .limit(pageSize)
          .then(books => {
            let arrForButtons = []

            let numberOfButtons = count / pageSize
            if (count % pageSize !== 0) {
              numberOfButtons++
            }

            for (let i = 1; i <= numberOfButtons; i++) {
              arrForButtons.push(i)
            }

            res.render('books/all', { books, arrForButtons })
          })
      })

    /* Book
      .find()
      .sort('-releaseDate')
      .then(books => {
        res.render('books/all', { books })
      }) */
  },

  getDetails: (req, res) => {
    const id = req.params.id

    Book
      .findById(id)
      .then(book => {
        res.render('books/details', book)
      })
  }
}
