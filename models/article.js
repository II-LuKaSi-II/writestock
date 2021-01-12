const mongoose = require('mongoose')
const marked = require('marked')
const slugify = require('slugify')

//these are used to convert Markdown to HTML and makesure no malicious code
const createDomPurify = require('dompurify')
const { JSDOM } = require('jsdom')
// allows dompurify to create html and purify it by using JSDOM window object 
const dompurify = createDomPurify(new JSDOM().window)

// Add an spot for image in the schema. use type: Buffer
const articleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    logopicture: {
        type: String,
    },
    articleType: {
        type: String,
    },
    articleTag: {
        type: String,
    },
    articleTagThree: {
        type: String,
    },
    articleTagTwo: {
        type: String,
    },
   
    pricewritten: {
        type: String
    },
    markdown: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        //default takes function
        default: Date.now
    },
    slug: {
        type: String,
        required: true,
        //need to make sure all slugs are unique because the are the url
        unique: true,
    },
    sanitizedHtml: {
        type: String,
        required: true
    }
})
//this function will be run before save or anything is done to the article. 
//we create the unique slug here 

articleSchema.pre('validate', function(next) {
    if (this.title) {
        //this turns the title into the slug, amkes sure its lowercase and no characters
        this.slug = slugify(this.title, { lower: true, strict: true})
    }
    
    if (this.markdown) {
        // marked converts to html then dompurify makes it safe 
        this.sanitizedHtml = dompurify.sanitize(marked(this.markdown))
    }

    next()
})
//This creates table in our database called Article with all the columns above
module.exports = mongoose.model('Article', articleSchema)