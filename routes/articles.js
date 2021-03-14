const _ = require('lodash')
const express = require('express')
const Article = require('./../models/article')
const router = express.Router()
const { ensureAuthenticated } = require('../config/auth')

const {
  getStockInfo
} = require("../helpers/iexapis.helper");

//these all begin with /articles becuase that's how theyre brought into server.js
router.get('/new', ensureAuthenticated, (req, res) => {
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
  if (article == null) {
    return res.redirect('/')
  }

  let stock, currentPrice, previousPrice, priceChange;

  stock = await getStockInfo(article.articleTicker)
  if (stock) {
    currentPrice = stock.latestPrice ? _.toNumber(stock.latestPrice) : _.toNumber(stock.iexRealtimePrice)
    previousPrice = _.toNumber(article.pricewritten)
    priceChange = (((currentPrice - previousPrice) / previousPrice) * 100).toFixed(2);
  }

  console.log(currentPrice, previousPrice, priceChange)
  res.render('articles/show', { article: article, stock, priceChange, priceIncreased: priceChange > 0, priceDecreased: priceChange < 0 })
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
    article.articleType = req.body.articleType
    article.articleTicker = req.body.articleTicker
    article.articleTickerTwo = req.body.articleTickerTwo
    article.articleTickerThree = req.body.articleTickerThree
    article.articleTickerFour = req.body.articleTickerFour
    article.articleTickerFive = req.body.articleTickerFive
    article.articleTag = req.body.articleTag
    article.articleTagTwo = req.body.articleTagTwo
    article.articleTagThree = req.body.articleTagThree
    article.articleTagFour = req.body.articleTagFour
    article.articleTagFive = req.body.articleTagFive
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