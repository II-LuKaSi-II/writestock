const express = require('express')
const router = express.Router()

const Article = require('./../models/article')


router.get('/MELI', async (req, res) => {
    const articles = await Article.find().sort({createdAt: 'desc'})

    res.render('ticker/MELI', {articles: articles})
});

router.get('/FUTU', async (req, res) => {
    const articles = await Article.find().sort({createdAt: 'desc'})

    res.render('ticker/FUTU', {articles: articles})
});

router.get('/SE', async (req, res) => {
    const articles = await Article.find().sort({createdAt: 'desc'})

    res.render('ticker/SE', {articles: articles})
});

router.get('/TDOC', async (req, res) => {
    const articles = await Article.find().sort({createdAt: 'desc'})

    res.render('ticker/TDOC', {articles: articles})
});

router.get('/ROKU', async (req, res) => {
    const articles = await Article.find().sort({createdAt: 'desc'})

    res.render('ticker/ROKU', {articles: articles})
});

router.get('/MGNI', async (req, res) => {
    const articles = await Article.find().sort({createdAt: 'desc'})

    res.render('ticker/MGNI', {articles: articles})
});

router.get('/TTD', async (req, res) => {
    const articles = await Article.find().sort({createdAt: 'desc'})

    res.render('ticker/TTD', {articles: articles})
});

router.get('/LSPD', async (req, res) => {
    const articles = await Article.find().sort({createdAt: 'desc'})

    res.render('ticker/LSPD', {articles: articles})
});

router.get('/SQ', async (req, res) => {
    const articles = await Article.find().sort({createdAt: 'desc'})

    res.render('ticker/SQ', {articles: articles})
});

router.get('/PTON', async (req, res) => {
    const articles = await Article.find().sort({createdAt: 'desc'})

    res.render('ticker/PTON', {articles: articles})
});

router.get('/AAPL', async (req, res) => {
    const articles = await Article.find().sort({createdAt: 'desc'})

    res.render('ticker/AAPL', {articles: articles})
});

router.get('/MSFT', async (req, res) => {
    const articles = await Article.find().sort({createdAt: 'desc'})

    res.render('ticker/MSFT', {articles: articles})
});

router.get('/GOOG', async (req, res) => {
    const articles = await Article.find().sort({createdAt: 'desc'})

    res.render('ticker/GOOG', {articles: articles})
});

router.get('/PRX.AS', async (req, res) => {
    const articles = await Article.find().sort({createdAt: 'desc'})

    res.render('ticker/PRX.AS', {articles: articles})
});

router.get('/GDRX', async (req, res) => {
    const articles = await Article.find().sort({createdAt: 'desc'})

    res.render('ticker/GDRX', {articles: articles})
});

router.get('/TCHEY', async (req, res) => {
    const articles = await Article.find().sort({createdAt: 'desc'})

    res.render('ticker/TCHEY', {articles: articles})
});


module.exports = router

