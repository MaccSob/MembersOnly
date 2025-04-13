const bcrypt = require("bcryptjs");
require('dotenv').config()
const path = require("node:path");
const express = require("express");
const session = require("express-session");
const passport = require("passport");
const indexRouter = require("./routes/indexRouter");
const LocalStrategy = require('passport-local').Strategy;
const pool = require("./db/pool");
const PORT = process.env.PORT;


const messages = [
  {
    user: "Juno",
    text: "Why?",
    added: new Date()
  },
  {
    user: "Andy",
    text: "Hey guys!!",
    added: new Date()
  },
  {
    user: "Brad",
  text: "Im going ya",
  added: new Date()
  } 
];

const app = express();


app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(__dirname + '/public'));

app.use(session({ secret: "cats", resave: false, saveUninitialized: false }));
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));





app.post("/signup", async (req, res, next) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 12);
    await pool.query("INSERT INTO users (firstname, lastname, username, email, password) VALUES ($1, $2, $3, $4, $5)", [req.body.username, hashedPassword,
      req.body.firstname,
      req.body.lastname,
      req.body.email,
    ]);
    res.redirect("/login");
  } catch(err) {
    return next(err);
  }
});
app.use("/", indexRouter);






app.listen(PORT, () => console.log(`app listening on port ! ${PORT}`));
