require('dotenv').config()
const path = require("node:path");
const express = require("express");
const session = require("express-session");
const passport = require("passport");
const indexRouter = require("./routes/indexRouter");
const LocalStrategy = require('passport-local').Strategy;
const pool = require("./db/pool");
const PORT = process.env.PORT;

const app = express();


app.use("/", indexRouter);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(session({ secret: "cats", resave: false, saveUninitialized: false }));
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));



app.listen(PORT, () => console.log(`app listening on port ! ${PORT}`));
