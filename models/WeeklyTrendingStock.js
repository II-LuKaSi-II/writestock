const marked = require('marked')
const { JSDOM } = require('jsdom')
const slugify = require('slugify')
const mongoose = require('mongoose')
const createDomPurify = require('dompurify')

const dompurify = createDomPurify(new JSDOM().window)

const WeeklyTrendingSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        required: true,
    },
    ticker: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    content: {
        type: String
    }
});

WeeklyTrendingSchema.pre('validate', function(next) {
    if (this.name) {
        this.slug = slugify(this.name, { lower: true, strict: true })
    }    
    if (this.content) {
        this.content = dompurify.sanitize(marked(this.content))
    }
    next()
});

module.exports = mongoose.model("WeeklyTrending", WeeklyTrendingSchema);