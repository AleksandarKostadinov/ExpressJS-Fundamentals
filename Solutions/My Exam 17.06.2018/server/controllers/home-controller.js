const mongoose = require('mongoose')
const Article = mongoose.model('Article')
const Edit = mongoose.model('Edit')

module.exports = {
  index: (req, res) => {
    Edit
      .find()
      .sort('-creationDate')
      .then(edits => {
        let articleIds = edits.map(e => e.articleId)

        Article
          .find({
            '_id': { $in: articleIds }, $and: [{ 'isMain': 'true' }, { 'isMain': true }]
          })
          .where('isMain').equals(true)
          .limit(3)
          .then(articles => {
            res.render('home/index', { user: req.user, latest: articles[0], recent: articles })
          })
      })
      .catch(err => {
        console.log(err)
        res.redirect('/')
      })
  },
  about: (req, res) => {
    // res.render('home/about')

    res.json(req.user)
  }
}
