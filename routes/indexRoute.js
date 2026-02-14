const {Router} = require("express");
const indexRoute = Router();
const userControl = require("../controllers/userControl");
const passport = require("passport");




indexRoute.get("/", userControl.mainPage);
indexRoute.get("/sign-up", userControl.getSignUpForm);
indexRoute.post("/sign-up", userControl.validateSignUp, userControl.addSignUp);
indexRoute.get("/log-in", userControl.LogInPage);
indexRoute.post("/log-in",
    passport.authenticate("local", {
        successRedirect: "/user-page",
        failureRedirect: "/log-in"
    })
);
indexRoute.get("/log-out", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});
indexRoute.get("/user-page", userControl.getUserPage);
indexRoute.get("/secret-code", userControl.getClubPage);
indexRoute.post("/secret-code", userControl.membershipStatus);
indexRoute.get("/messages", userControl.getPosts);




module.exports = indexRoute;