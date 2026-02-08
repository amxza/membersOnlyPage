const {Router} = require("express");
const indexRoute = Router();
const userControl = require("../controllers/userControl");
const {body, validationResult} = require("express-validator");

const registerValidation = [
    body('password')
    .isLength({min: 7})
    .withMessage("Password Must be more than 7 characters."),

    body('confirmPassword')
    .custom((value, {req}) => {
        if (value !== req.body.password) {
        throw new Error('Password confirmation does not match password');
      }
      // Indicates the success of this synchronous custom validator
      return true;
    })
];

indexRoute.get("/", userControl.mainPage);
indexRoute.get("/sign-up", userControl.getSignUpForm);
indexRoute.post("/sign-up", registerValidation ,userControl.addSignUp);


module.exports = indexRoute;