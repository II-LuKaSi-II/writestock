const express = require('express')
const router = express.Router()

const Article = require('./../models/article')


router.get('/connectedtv', async (req, res) => {
    const articles = await Article.find().sort({createdAt: 'desc'})

    res.render('tags/connectedtv', {articles: articles})
});

router.get('/asia', async (req, res) => {
    const articles = await Article.find().sort({createdAt: 'desc'})

    res.render('tags/asia', {articles: articles})
});

router.get('/AWS', async (req, res) => {
    const articles = await Article.find().sort({createdAt: 'desc'})

    res.render('tags/AWS', {articles: articles})
});

router.get('/e-commerce', async (req, res) => {
    const articles = await Article.find().sort({createdAt: 'desc'})

    res.render('tags/e-commerce', {articles: articles})
});

router.get('/etfs', async (req, res) => {
    const articles = await Article.find().sort({createdAt: 'desc'})

    res.render('tags/etfs', {articles: articles})
});

router.get('/fintech', async (req, res) => {
    const articles = await Article.find().sort({createdAt: 'desc'})

    res.render('tags/fintech', {articles: articles})
});

router.get('/gaming', async (req, res) => {
    const articles = await Article.find().sort({createdAt: 'desc'})

    res.render('tags/gaming', {articles: articles})
});

router.get('/payment-processing', async (req, res) => {
    const articles = await Article.find().sort({createdAt: 'desc'})

    res.render('tags/payment-processing', {articles: articles})
});

router.get('/programmatic-advertising', async (req, res) => {
    const articles = await Article.find().sort({createdAt: 'desc'})

    res.render('tags/programmatic-advertising', {articles: articles})
});

router.get('/SaaS', async (req, res) => {
    const articles = await Article.find().sort({createdAt: 'desc'})

    res.render('tags/SaaS', {articles: articles})
});

router.get('/southamerica', async (req, res) => {
    const articles = await Article.find().sort({createdAt: 'desc'})

    res.render('tags/southamerica', {articles: articles})
});




module.exports = router


