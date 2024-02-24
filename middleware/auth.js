const middlewareObj = {};
const Post = require('../models/post');

middlewareObj.checkLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "Musíš být přihlášený!")
    res.redirect('/login')
};

middlewareObj.checkPostOwnership = function(req, res, next){
    if(req.isAuthenticated()){
        Post.findById(req.params.id, function(err, foundPost){
            if(err) {
                console.log(err)
            } else{
                if(foundPost.author.id.equals(req.user._id)){
                    next();
                }else{
                    res.send("Nejsi přihlášený! K podniknutí této akce se přihlaš.")
                }
            }
        })
    }else{
        req.flash("error", "Musíš být přihlášený!")
        res.redirect("back")
    }
}


module.exports = middlewareObj;