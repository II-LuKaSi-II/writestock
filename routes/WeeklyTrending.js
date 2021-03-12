const express = require('express')
const { Types: { ObjectId } } = require('mongoose')
const evalidate  = require('evalidate')
const transform_mongoose_error = require('mongoose-validation-error-handler');

const WeeklyTrendingStock = require('./../models/WeeklyTrendingStock')
const { addStockInfoOnWeeklyTrendingStocs } = require('../helpers/weeklyTrendingStock.helper');

const router = express.Router()

/**
 * Get all trending stocks
 */
router.get("/", async (req, res) => {
    let trendings = await WeeklyTrendingStock.find({}).lean()
    trendings = await addStockInfoOnWeeklyTrendingStocs(trendings);
    res.json(trendings);
});

/**
 * Get trending stocks management page
 */
 router.get("/manage", async (req, res) => {
    let stocks = await WeeklyTrendingStock.find({}).lean()
    res.render('weekly_trending_stocks/table', {
        stocks: stocks 
    });
});

/**
 * Register trending stocks page
 */
 router.get("/register", async (req, res) => {
    res.render('weekly_trending_stocks/register');
});

/**
 * Get trending stocks management page
 */
 router.get("/manage/:id/edit", async (req, res) => {
    let stock = await WeeklyTrendingStock.findById(req.params.id);
    res.render('weekly_trending_stocks/edit', {
        stock: stock 
    });
});

/**
 * Create a trending stock
 */
router.post("/", async (req, res) => {
    const Schema = new evalidate.schema({
        name: evalidate.string().required(),
        ticker: evalidate.string().required(),
        price: evalidate.string().numeric().required()
    });
    const result = Schema.validate(req.body);
    if (result.isValid) {
        WeeklyTrendingStock.create(req.body)
            .then((response) => {
                res.redirect(`/weeklyTrendingStocks/manage/${response._id}/edit`);
            })
            .catch((error) => {
                let errorMessage = transform_mongoose_error.default(error, { capitalize: true, humanize: true });
                res.status(400).json({ errors: errorMessage });
            });
    }
    else {
        res.status(400).json({ errors: result.errors });
    }
});


/**
 * Get a trending stock by Id
 */
 router.get("/:id", async (req, res) => {
    let isValidId = ObjectId.isValid(req.params.id)
    if (!isValidId) {
        return res.status(404).json({ errors: [ 'Trending stock not found '] })
    }
    let result = await WeeklyTrendingStock.findById(req.params.id)
    if (!result) {
        return res.status(404).json({ errors: [ 'Trending stock not found '] })
    }
    res.json(result);
});

/**
 * Update a trending stock by Id
 */
 router.post("/:id/update", async (req, res) => {
    let isValidId = ObjectId.isValid(req.params.id)
    if (!isValidId) {
        return res.status(404).json({ errors: [ 'Trending stock not found '] })
    }
    let result = await WeeklyTrendingStock.findOne({ _id: req.params.id })
    if (!result) {
        return res.status(404).json({ errors: [ 'Trending stock not found '] })
    }

    result.name = req.body.name ? req.body.name : result.name;
    result.price = req.body.price ? req.body.price : result.price;
    result.ticker = req.body.ticker ? req.body.ticker : result.ticker;
    result.content = req.body.content ? req.body.content : result.content;
    console.log(result)
    result.save((error, response) => {
        if (error) {
            console.log(error)
            let errorMessage = transform_mongoose_error.default(error, { capitalize: true, humanize: true });
            res.status(400).json({ errors: errorMessage });
        }
        else {
            console.log(response)
            res.redirect(`/weeklyTrendingStocks/manage`);
        }
    });
});

/**
 * Delete a trending stock by Id
 */
 router.get("/:id/delete", async (req, res) => {
    let isValidId = ObjectId.isValid(req.params.id)
    if (!isValidId) {
        return res.status(404).json({ errors: [ 'Trending stock not found '] })
    }
    let result = await WeeklyTrendingStock.deleteMany({ _id: req.params.id })
    res.redirect(`/weeklyTrendingStocks/manage`);
});

module.exports = router