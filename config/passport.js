const LocalStrategy = require('passport-local').Strategy
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')


//Load user Model
const User = require('../models/User')

module.exports = function(passport) {
    passport.use(
        new LocalStrategy({usernameField: 'email'}, (email, password, done) => {
            //first we want to see if email already ecists is Database
            User.findOne({ email: email })
                .then(user => {
                    if(!user) {
                        //we also return the done callback, then null and false for the problem is user is not there
                        return done(null, false, { message: 'Nice try. Youre not in our system, Punk' })
                    }
                    
                    //See if password matches - using bcrypt
                    //this takes in entered password and user.password from the database
                    bcrypt.compare(password, user.password, (err, isMatch) => {
                        if(err) throw err

                        if (isMatch) {
                            return done(null,user)
                        } else {
                            return done(null, false, { message: 'password incorrect'})
                        }
                    })
                })
                .catch(err => console.log(err))
        })
    )

//We need methods for serializning and deserializing the users
    passport.serializeUser((user, done) => {
        done(null, user.id)
    })
  
    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
            done(err, user)
        })
    })
}