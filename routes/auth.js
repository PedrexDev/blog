const express = require('express');
const router = express.Router();
const User = require('../models/user');
const passport = require("passport");

router.get('/login', function(req, res){
    res.render("auth/login")
});

router.get('/register', function(req, res){
    res.render("auth/register")
})

router.post('/register', function(req, res){
    User.register(new User({username: req.body.username}), req.body.password, 
        function(err, msg) {
            if(err) {
                console.log(err)
            }

            passport.authenticate('/local') (req, res, 
                function() {
                    res.redirect("/")
                }
            )
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
