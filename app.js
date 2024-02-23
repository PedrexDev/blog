const { log, success, warning, danger, colors } = require('./logger.js');
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const indexRoute = require("./routes/index");
const postRoute = require("./routes/blog");
const commentRoute = require("./routes/comment");
const authRoute = require("./routes/auth");
const passport = require("passport");
const localStrategy = require("passport-local");
const User = require("./models/user");
const flash = require('connect-flash');

var port = 3000;

app.use(methodOverride("_method"));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(flash())

app.use(
  require("express-session")({
    secret: "xDfsdf42211XfFEr",
    resave: false,
    saveUninitialized: false
  })
);

passport.use(new localStrategy(User.authenticate()));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next) {
  res.locals.error = req.flash('error')
  res.locals.success = req.flash('success')
  res.locals.currentUser = req.user;
  next();
});

app.use(indexRoute);
app.use(postRoute);
app.use(commentRoute);
app.use(authRoute);

mongoose.connect("mongodb+srv://user:fduZkhYydqbr90OW@testenv.wmjkcx6.mongodb.net/", { useNewUrlParser: true, useUnifiedTopology: true });
app.set("view engine", "ejs");

app.listen(port, function() {
  log(`Running on port ${colors.bgGreen}${port}${colors.reset}.`);
});
