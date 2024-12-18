const express = require("express");
const router = express.Router();
const Post = require("../models/post");
const middleware = require("../middleware/auth");
const User = require("../models/user");
const { log, success, warning, danger, colors } = require('../logger.js');

router.get("/about", function(req, res){
  res.render("about")
})

router.get("/u/:username", function(req, res){
  const username = req.params.username;

  User.findOne({ username: username })
    .populate("posts")
    .exec(function(err, user) {
      if (err) {
        console.error("Error finding user:", err);
        res.status(500).send("An error occurred while fetching user information.");
      } else {
        if (user) {
          res.render("user", { user: user });
        } else {
          res.status(404).send("User not found.");
        }
      }
    });
});

router.get("/", function(req, res) {
  Post.find({}, function(err, posts) {
    if (err) {
      danger(`${colors.bgYellow}[GET "/"] An error occured:${colors.reset} ${colors.bgRed}${err}${colors.reset}`);
    } else {
      res.render("blog/blog", { posts: posts });
    }
  });
});

router.get("/blog/new", middleware.checkLoggedIn, function(req, res) {
  res.render("blog/new");
});

router.post("/", middleware.checkLoggedIn, function(req, res) {
  var author = {
    id: req.user._id,
    username: req.user.username
  };

  Post.create(
    {
      title: req.body.title,
      content: req.body.content,
      image: req.body.image,
      author: author
    },
    function(err, savedPost) {
      if (err) {
        danger(`${colors.bgYellow}[POST "/"] An error occurred:${colors.reset} ${colors.bgRed}${err}${colors.reset}`);
      } else {
        // Update the user's posts array
        User.findById(req.user._id, function(err, foundUser) {
          if (err) {
            console.error("Error finding user:", err);
          } else {
            foundUser.posts.push(savedPost);
            foundUser.save(function(err) {
              if (err) {
                console.error("Error updating user's posts:", err);
              }
            });
          }
        });
        
        res.redirect("/");
      }
    }
  );
});

router.get("/blog/:id", function(req, res) {
  Post.findById(req.params.id)
    .populate("comments")
    .exec(function(err, post) {
      if (err) {
        danger(`${colors.bgYellow}[GET "/blog/:id"] An error occured:${colors.reset} ${colors.bgRed}${err}${colors.reset}`);
      } else {
        res.render("blog/post", { post: post });
      }
    });
});

router.get("/blog/:id/edit", middleware.checkPostOwnership, function(req, res) {
  Post.findById(req.params.id, function(err, post) {
    if (err) {
      danger(`${colors.bgYellow}[GET "/blog/:id/edit"] An error occured:${colors.reset} ${colors.bgRed}${err}${colors.reset}`);
    } else {
      res.render("blog/edit", { post: post });
    }
  });
});

router.put("/blog/:id", middleware.checkPostOwnership, function(req, res) {
  newData = {
    title: req.body.title,
    image: req.body.image,
    content: req.body.content
  };
  Post.updateOne({ _id: req.params.id }, newData, function(err, returnedData) {
    if (err) {
      danger(`${colors.bgYellow}[PUT "/blog/:id"] An error occured:${colors.reset} ${colors.bgRed}${err}${colors.reset}`);
    } else {
      // console.log(returnedData)
      res.redirect("/blog/" + req.params.id);
    }
  });
});

router.delete("/blog/:id", middleware.checkPostOwnership, function(req, res) {
  Post.remove({ _id: req.params.id }, function(err, returnedData) {
    if (err) {
      danger(`${colors.bgYellow}[DELETE "/blog/:id"] An error occured:${colors.reset} ${colors.bgRed}${err}${colors.reset}`);
    } else {
      // console.log(returnedData)
      res.redirect("/");
    }
  });
});

module.exports = router;
