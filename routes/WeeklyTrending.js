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
            .then((response) => res.json(response))
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


module.exports = router