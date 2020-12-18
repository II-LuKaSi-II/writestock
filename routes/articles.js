const express = require('express')
const Article = require('./../models/article')
const router = express.Router()
const { ensureAuthenticated } = require('../config/auth')


//these all begin with /articles becuase that's how theyre brought into server.js
router.get('/new', (req, res) => {
  res.render('articles/new', { article: new Article() })
})

router.get('/about', (req, res) => {
  res.render('articles/about')
})

router.get('/edit/:id', ensureAuthenticated, async (req, res) => {
  const article = await Article.findById(req.params.id)
  res.render('articles/edit', { 
    name: req.user.name,
    article
  })
})


router.get('/:slug', async (req, res) => {
  const article = await Article.findOne({ slug: req.params.slug })
  // handle case where article does not exist
  if (article == null) res.redirect('/')
  // if (!article)
  res.render('articles/show', { article: article })
})

router.post('/', async (req, res, next) => {
  req.article = new Article()
  next()
}, saveArticleAndRedirect('new'))

router.put('/:id', async (req, res, next) => {
  req.article = await Article.findById(req.params.id)
  next()
}, saveArticleAndRedirect('edit'))

router.delete('/:id', async (req, res) => {
  await Article.findByIdAndDelete(req.params.id)
  res.redirect('/')
})

// This will be important for adding the logo !!!!
function saveArticleAndRedirect(path) {
  return async (req, res) => {
    let article = req.article
    article.title = req.body.title
    article.logopicture = req.body.logopicture
    article.pricewritten = req.body.pricewritten
    article.description = req.body.description
    article.markdown = req.body.markdown
    try {
      article = await article.save()
      res.redirect(`/articles/${article.slug}`)
    } catch (e) {
      res.render(`articles/${path}`, { article: article })
    }
  }
}

router.get('/edit/:id', ensureAuthenticated, (req, res) => 
    res.render('articles/edit', {
        name: req.user.name
    }))


module.exports = router