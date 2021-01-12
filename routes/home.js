const express = require('express')
const router = express.Router()
//We use the { } bracket notation to bring in individial element from file to use as middleware
const { ensureAuthenticated } = require('../config/auth')

//Welcome Home Page
router.get('/', (req, res) => res.render('welcome'))



router.get('/contact', (req, res) => res.render('contact'))
//Dashboard page rendering dashbaord view
//pass in authentification function as second parameter to protect this route
// router.get('/dashboard', ensureAuthenticated, (req, res) => 
//     res.render('dashboard', {
//         name: req.user.name
//     }))

module.exports = router  