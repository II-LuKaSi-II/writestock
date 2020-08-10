module.exports = {
    //We can add this middleware to any route that we want to be protected through authentication
    ensureAuthenticated: function(req, res, next) {
        if(req.isAuthenticated()) {
            return next()
        }
        req.flash('error_message', 'Please log in to view this page')
        res.redirect('/users/login')
    }
}