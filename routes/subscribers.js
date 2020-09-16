const express = require('express')
const router = express.Router()


//User Model
const Subscriber = require('../models/Subscriber')

//Login Page

router.get('/subscribe', (req, res) => res.render('subscribe'))


//Subscribe Handle
//When subscribe button is hit on form it's going to make a post request here
router.post('/', (req,res) => {
    //destrcuting allows us to pull things out of request.body
    const { name, email } = req.body
    let errors = []
    //Check required fieldsw
    if (!name || !email ) {
        errors.push({ msg: 'Please fill in all fields'})
    }
    // //Check passwords match
    // if (password !== password2) {
    //     errors.push({ msg: 'Passwords do not match' })
    // }
    // //Check password elngth
    // if (password.length < 6) {
    //     errors.push({ msg: 'Password is too short'})
    // }
    if (errors.length > 0) {
        //errors were found, validation failed
        res.render('subscribe', {
            errors,
            name,
            email
        })
    } else {
        //Validation passed
        Subscriber.findOne({ email: email})
            .then(user => {
                if(user) {
                    //User exists
                    errors.push({ msg: 'That email is alreayd associated with an account'})
                    res.render('subscribe', {
                        //this is ES6 syntax for errors: errors etc
                        errors,
                        name,
                        email,
                    })
                } else {
                    //when you have a model and you want to create a new instance you use the 'new' keyword
                    const newSubscriber = new Subscriber({
                        //this is ES6 syntax for errors: errors etc
                        name,
                        email,
                    })
     //         Save User
                    newSubscriber.save()
                        .then(user => {
                            req.flash('success_msg', 'you are now subscribed')
                            res.redirect('/subscribers')
                        })
                             .catch(err => console.log(err))
                }
            })

    }
}) 

module.exports = router 