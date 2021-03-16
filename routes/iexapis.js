const _ = require('lodash')
const $ = require('jquery');
const express = require('express')
const { getStockInfo } = require("../helpers/iexapis.helper");

const router = express.Router()

router.post('/priceDifference', async (req, res) => {
    let priceChange = 0;
    let currentPrice = 0;
    let ticker = req.body.ticker;
    let price = _.toNumber(req.body.price);

    let stock = await getStockInfo(ticker)
    if (stock) {
        currentPrice = stock.latestPrice ? _.toNumber(stock.latestPrice) : _.toNumber(stock.iexRealtimePrice);
        priceChange = (((currentPrice - price) / price) * 100).toFixed(2);
    }
    
    res.status(200).json({
        price,
        priceChange,
        currentPrice
    })
})

module.exports = router  