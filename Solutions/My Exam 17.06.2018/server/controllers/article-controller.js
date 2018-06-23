const mongoose = require('mongoose')
const Article = mongoose.model('Article')
const Edit = mongoose.model('Edit')

module.exports = {
  createGet: (req, res) => {
    res.render('article/create', { user: req.user })
  },
  createPost: (req, res) => {
    const title = req.body.title
    const content = req.body.content
    const author = req.user.username

    Article.create({
      title
    }).then(article => {
      Edit.create({
        author,
        content,
        articleId: article._id
      }).then(edit => {
        article.edits.push(edit._id)
        article
          .save()
          .then(() => {
            res.redirect('/article/all')
          })
      })
    })
      .catch(err => {
        console.log(err)
        res.redirect('/')
      })
  },
  getAll: (req, res) => {
    Article
      .find({ $or: [{ 'isMain': 'true' }, { 'isMain': true }] })
      .sort({ title: 1 })
      .then(articles => {
        res.render('article/all', { articles, user: req.user })
      })
      .catch(err => {
        console.log(err)
        res.redirect('/')
      })
  },
  getDeatils: (req, res) => {
    Article
      .findById(req.params.id)
      .then(article => {
        Edit
          .find({
            '_id': { $in: article.edits }
          })
          .sort('-creationDate')
          .limit(1)
          .then(edits => {
            let edit = edits[0]

            article.content = edit.content.split('\n\n')
            article.user = req.user
            res.render('article/details', article)
          })
      })
      .catch(err => {
        console.log(err)
        res.redirect('/')
      })
  },

  getEdit: (req, res) => {
    Article
      .findById(req.params.id)
      .then(article => {
        if ((article.lockedStatus === true && !req.user.roles.includes('Admin')) || article.isMain !== true) {
          res.redirect('/')
          return
        }
        Edit
          .find({
            '_id': { $in: article.edits }
          })
          .sort('-creationDate')
          .limit(1)
          .then(edits => {
            let edit = edits[0]

            article.content = edit.content
            let user = req.user
            user.isAdmin = req.user.roles.includes('Admin')
            res.render('article/edit', { article, user })
          })
      })
      .catch(err => {
        console.log(err)
        res.redirect('/')
      })
  },

  postEdit: (req, res) => {
    Article
      .findById(req.body.id)
      .then(article => {
        if ((article.lockedStatus === true && !req.user.roles.includes('Admin')) || article.isMain !== true) {
          return res.redirect('/')
        }

        Article.create({
          title: article.title,
          lockedStatus: true
        })
          .then(newEditArticle => {
            Edit
              .create({
                author: req.user.username,
                content: req.body.content,
                articleId: newEditArticle._id
              })
              .then(edit => {
                article.edits.push(edit._id)
                article.isMain = false
                article
                  .save()
                  .then(() => {
                    newEditArticle.edits.push(edit._id)
                    newEditArticle.save().then(() => {
                      res.redirect('/article/all')
                    })
                  })
              })
          })
      })
      .catch(err => {
        console.log(err)
        res.redirect('/')
      })
  },

  getHistory: (req, res) => {
    let title = req.params.title

    Article
      .find({ 'title': title })
      .sort({ 'edits.length': 1 })
      .limit(1)
      .then(articles => {
        const article = articles[0]

        Edit
          .find({
            '_id': { $in: article.edits }
          })
          .sort('-creationDate')
          .then(edits => {
            res.render('article/history', { edits, user: req.user })
          })
      })
  },

  lock: (req, res) => {
    let id = req.params.id

    Article
      .findById(id)
      .then(article => {
        article.lockStatus = true
        article.save(() => {
          res.redirect('/article/all')
        })
      })
  },

  unlock: (req, res) => {
    let id = req.params.id

    Article
      .findById(id)
      .then(article => {
        article.lockStatus = false
        article.save(() => {
          res.redirect('/article/all')
        })
      })
  },

  search: (req, res) => {
    Article
      .find({ "title": { "$regex": req.body.text, "$options": "i" } })
      .then(arts => {
        res.render('article/search', {articles: arts})
      })
  }
}
