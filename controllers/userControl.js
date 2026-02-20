const db = require("../db/queries");
const {body, validationResult} = require("express-validator");
require("dotenv").config();
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
async function getClubPage(req, res) {
    res.render("memberCode");
}

async function membershipStatus(req, res) {
    const {secretCode} = req.body;
    const secretCodeUpper = secretCode.toUpperCase();
    try {
        if(secretCodeUpper === process.env.SECRETCODE) {
        const currentUsername = req.user.username;
        await db.changeMembershipStatus(currentUsername);
        return res.redirect("/user-page");
     }
     return res.render("memberCode", {error: "Incorrect Code"});
    } catch (error) {
        return res.render("memberCode", {error: error.message});
    }
}

async function getPosts(req, res) {
    try {
        const messages = await db.getAllMessages();
        res.render("messages", {messages: messages})
    } catch (error) {
        console.error(error);
        return res.status(500).send("Error Fetching Posts")
    }
}

async function getNewMessage(req, res) {
    res.render("newMessage");
}

async function addPost(req, res) {
    const { title, text } = req.body;
    
    // Passport provides the user object on the request
    const userId = req.user.id; 

    try {
        await db.createNewPost(title, text, userId);
        res.redirect("/user-page");
    } catch (error) {
        console.error(error);
        res.status(500).send("Error saving post.");
    }
}

module.exports = {
    mainPage,
    getSignUpForm,
    validateSignUp,
    addSignUp,
    LogInPage,
    getUserPage,
    getClubPage,
    membershipStatus,
    getPosts,
    getNewMessage,
    addPost,
}