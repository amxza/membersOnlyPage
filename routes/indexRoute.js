const {Router} = require("express");
const indexRoute = Router();
const userControl = require("../controllers/userControl");




indexRoute.get("/", userControl.mainPage);
indexRoute.get("/sign-up", userControl.getSignUpForm);
indexRoute.post("/sign-up", userControl.validateSignUp, userControl.addSignUp);


module.exports = indexRoute;