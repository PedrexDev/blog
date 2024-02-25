const express = require('express');
const router = express.Router();
const User = require('../models/user');
const middleware = require("../middleware/auth");
const passport = require("passport");

router.get('/login', function(req, res){
    res.render("auth/login")
});

router.get('/register', middleware.checkLoggedIn, function(req, res){
    res.render("auth/register")
})

router.post('/register', middleware.checkLoggedIn, function(req, res){
    User.register(new User({username: req.body.username}), req.body.password, 
        function(err, msg) {
            if(err) {
                console.log(err)
            }
        }
    )
})

router.post('/login', 
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login'
    }
))

router.get('/logout', function(req, res){
    req.logout();
    res.redirect('/')
})

module.exports = router;
