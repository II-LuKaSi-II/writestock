//set up Node/Express backend/server
const express = require('express')
// EJS Layouts
const expressLayouts = require('express-ejs-layouts')
//use mongoose to connect to mongodb
const mongoose = require('mongoose')
// in order to access the articles we need to pull in the article model
const Article = require('./models/article')
//this is how you access the router from the aticles.js router
const request = require('request');
const bodyParser = require('body-parser')

const articleRouter = require('./routes/articles')
const homeRouter = require('./routes/home')
const tagsRouter = require('./routes/tags')
const tickerRouter = require('./routes/ticker')
//this is to use other methods besdies get post
const methodOverride = require('method-override')
const flash = require('connect-flash')
const session = require('express-session')
const passport = require('passport')
const { ensureAuthenticated } = require('./config/auth')

const app = express()

//Passport Config
require('./config/passport')(passport)

//MongoDB Config
const db = require('./config/keys').MongoURI

//this line of code connects us to the mongodb database
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    .then(() => console.log('MongoDB now Connected. Congratualtions.'))
    .catch(err => console.log(err))
//this is to connect to local instead of atlas
// mongoose.connect('mongodb://localhost/writestockblog', { 
//     useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true
// })
// API Key pk_32b83d1e7ecb4c229b342146677133aa
//create call API Function 

app.use(bodyParser.urlencoded({extended: false}));

function call_api(finishedAPI, tickticktick) {
    if(tickticktick) {
        request('https://cloud.iexapis.com/stable/stock/' + tickticktick + '/quote?token=pk_32b83d1e7ecb4c229b342146677133aa', { json: true }, (err, res, body) => {
            if(err) {return console.log(err);}
            if(res.statusCode === 200) {
                // console.log(body);
                finishedAPI(body);
                };
            });
    }
    if(!tickticktick) {
        request('https://cloud.iexapis.com/stable/stock/sklz/quote?token=pk_32b83d1e7ecb4c229b342146677133aa', { json: true }, (err, res, body) => {
            if(err) {return console.log(err);}
            if(res.statusCode === 200) {
                // console.log(body);
                finishedAPI(body);
                };
            });
    }

};


// EJS Layouts 
app.use(expressLayouts)
//Set our view engine. We write our views in ejs, and it needs to be converted to HTML
app.set('view engine', 'ejs')

//Bodyparser 
// tell our app how to access stuff filled into the form/ allow us access to form in in articles post route
app.use(express.urlencoded({ extended: false}))

//Express Session Middleware
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
}))

//Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

//Connect Flash
app.use(flash())

//Global Variables
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg')
    res.locals.error_msg = req.flash('error_msg')
    res.locals.error = req.flash('error')
    next()
})

//Allows us to do more than just GET and POST
app.use(methodOverride('_method'))


// using app.use to serve up static CSS files in public/assets/ folder when /public link is called in ejs files
// app.use("/route", express.static("foldername"));
app.use('/public', express.static('public'));



//create route for index, takes in request and response
app.get('/', async (req, res) => { 
    const articles = await Article.find().sort({createdAt: 'desc'})
    call_api(function(doneAPI) {
            res.render('articles/index', {
            articles: articles, 
            stock: doneAPI  
            });
    }, 'fb');
    //here we render the ejs/html. after render is the ('path'),
    // which in this case is the index page/home page
    //pass from server an object into render to be available to be output on path page
    //passing articles variable to index path

});
//set Post Route
app.post('/', async (req, res) => { 
    call_api(function(doneAPI) {
        // posted_stuff = req.body.stock_ticker;
        res.render('articles/index', {
        articles: articles, 
        stock: doneAPI,  
        });
    }, req.body.stock_ticker);
    const articles = await Article.find().sort({createdAt: 'desc'})
});

// app.get('/articles/about', async (req, res) => { 
//     const articles = await Article.find().sort({createdAt: 'desc'})

//     //here we render the ejs/html. after render is the ('path'),
//     // which in this case is the index page/home page
//     //pass from server an object into render to be available to be output on path page
//     //passing articles variable to index path
//     res.render('articles/about', { articles: articles })
// });

app.get('/companyanalysis', async (req, res) => { 
    const articles = await Article.find().sort({createdAt: 'desc'})

    //here we render the ejs/html. after render is the ('path'),
    // which in this case is the index page/home page
    //pass from server an object into render to be available to be output on path page
    //passing articles variable to index path
    res.render('companyanalysis', { 
        articles: articles
    })
});

app.get('/earningsreviews', async (req, res) => { 
    const articles = await Article.find().sort({createdAt: 'desc'})

    //here we render the ejs/html. after render is the ('path'),
    // which in this case is the index page/home page
    //pass from server an object into render to be available to be output on path page
    //passing articles variable to index path
    res.render('earningsreviews', { 
        articles: articles
    })
});

app.get('/sectors', async (req, res) => { 
    const articles = await Article.find().sort({createdAt: 'desc'})

    //here we render the ejs/html. after render is the ('path'),
    // which in this case is the index page/home page
    //pass from server an object into render to be available to be output on path page
    //passing articles variable to index path
    res.render('sectors', { 
        articles: articles
    })
});


app.get('/dashboard', ensureAuthenticated, async (req, res) => { 
    const articles = await Article.find().sort({createdAt: 'desc'})

    //here we render the ejs/html. after render is the ('path'),
    // which in this case is the index page/home page
    //pass from server an object into render to be available to be output on path page
    //passing articles variable to index path
    res.render('dashboard', { 
        articles: articles, 
        name: req.user.name
    })
})



//tells app to use the article router. this /articles makes it so router is only used after / articles. Way to separate routers


// Routes

app.use('/home', homeRouter)
app.use('/tags', tagsRouter)
app.use('/ticker', tickerRouter)
app.use('/users', require('./routes/users'))
app.use('/subscribers', require('./routes/subscribers'))
app.use('/articles', articleRouter)

const PORT = process.env.PORT || 5000;
//listening on what port
app.listen(PORT, console.log(`You're up and running on port ${PORT} my dude.`))
