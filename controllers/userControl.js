const db = require("../db/queries");
const {body, validationResult} = require("express-validator");




async function mainPage(req, res) {
    res.render("index");
}

async function getSignUpForm(req, res) {
    res.render("sign-up-form");
}

async function addSignUp(req, res) {
    try{
        const newFirstName = req.body.first_name;
        const newLastName = req.body.last_name;
        const newUsername = req.body.username;
        const newPassword = req.body.password;
        await db.getNewUser(newFirstName, newLastName, newUsername, newPassword);
        res.redirect("/");
    } catch (error) {
        
    }
        
    
}



module.exports = {
    mainPage,
    getSignUpForm,
    addSignUp,
}