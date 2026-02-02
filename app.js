const path = require("node:path");
const express = require("express");
const session = require("express-session");
const passport = require("passport");
require("dotenv").config();

const app = express();
const PORT = 3000;

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
const indexRoute = require("./routes/indexRoute");

app.use(session({ secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: false }));
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));

app.use("/", indexRoute);

app.listen(PORT, (error) => {
  if (error) {
    throw error;
  }
  console.log(`app running on  http://localhost:${PORT}`);
});