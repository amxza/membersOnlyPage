


async function mainPage(req, res) {
    res.render("index");
}

async function getSignUpForm(req, res) {
    res.render("sign-up-form");
}

async function addSignUp(req, res) {
    
}



module.exports = {
    mainPage,
    getSignUpForm,
}