const db = require("../db/queries");
const {body, validationResult} = require("express-validator");

const validateSignUp = [
    body("password")
    .isLength({min: 7})
    .withMessage("Password must be more than 7 characters long."),
    body("confirmPassword")
    .custom((value, {req}) => {
        if (value !== req.body.password) {
            throw new Error("Passwords do not match...")
        }
        return true;
    })
];


async function mainPage(req, res) {
    res.render("index", { user: req.user });
}

 async function getSignUpForm(req, res) {
    res.render("sign-up-form");
}


async function addSignUp(req, res) {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).render("sign-up-form", {
                errors: errors.array(),
            });
        }
        try {
            const {first_name, last_name, username, password} = req.body;
            await db.getNewUser(first_name, last_name, username, password);
            res.redirect("/user-page");
        } catch (error) {
            res.status(500).render("sign-up-form", { errors: [{ msg: "Database error" }] });
        }   
}

async function LogInPage(req, res) {
    res.render("log-in");
}

async function getUserPage(req, res) {
    res.render("user-page");
}
module.exports = {
    mainPage,
    getSignUpForm,
    validateSignUp,
    addSignUp,
    LogInPage,
    getUserPage,
}