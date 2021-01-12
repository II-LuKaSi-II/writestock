const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const passport = require("passport");
const { ensureAuthenticated } = require('../config/auth')



//User Model
const User = require("../models/User");

//Login Page
router.get("/login",  (req, res) => res.render("login"));

//Register Page
// router.get("/register", (req, res) => res.render("register"));

//Register Handle
//When register button is hit on form it's going to make a post request to /users/register
router.post("/register", ensureAuthenticated, (req, res) => {
  //destrcuting allows us to pull things out of request.body
  const { name, email, password, password2 } = req.body;
  let errors = [];
  //Check required fieldsw
  if (!name || !email || !password || !password2) {
    errors.push({ msg: "Please fill in all fields" });
  }
  //Check passwords match
  if (password !== password2) {
    errors.push({ msg: "Passwords do not match" });
  }
  //Check password elngth
  if (password.length < 6) {
    errors.push({ msg: "Password is too short" });
  }
  if (errors.length > 0) {
    //errors were found, validation failed
    res.render("register", {
      errors,
      name,
      email,
      password,
      password2,
    });
  } else {
    //Validation passed
    User.findOne({ email: email }).then((user) => {
      if (user) {
        //User exists
        errors.push({
          msg: "That email is alreayd associated with an account",
        });
        res.render("register", {
          //this is ES6 syntax for errors: errors etc
          errors,
          name,
          email,
          password,
          password2,
        });
      } else {
        //when you have a model and you want to create a new instance you use the 'new' keyword
        const newUser = new User({
          //this is ES6 syntax for errors: errors etc
          name,
          email,
          password,
        });

        //Hash Password
        //we need to generate a salt to create a hash
        bcrypt.genSalt(10, (err, salt) =>
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            //Set Password to Hash
            newUser.password = hash;

            //Save User
            newUser
              .save()
              .then((user) => {
                req.flash("success_msg", "you are now registered");
                res.redirect("/users/login");
              })
              .catch((err) => console.log(err));
          })
        );
      }
    });
  }
});

//Login Handle
router.post("/login", (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/users/login",
    failureFlash: true,
  })(req, res, next);
});

//Log Out Handle

router.get("/logout", (req, res) => {
  //Using Passport middleware gets us the logout function
  req.logout();
  //Everytime you want to send a flash message you can use req.flash
  req.flash("success_msg", "You have been successfully logged out");
  res.redirect("/users/login");
});

module.exports = router;
