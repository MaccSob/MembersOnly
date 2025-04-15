const bcrypt = require("bcryptjs");
require('dotenv').config()
const path = require("node:path");
const express = require("express");
const session = require("express-session");
const passport = require("passport");
const pgSession = require('connect-pg-simple')(session);
const indexRouter = require("./routes/indexRouter");
const LocalStrategy = require('passport-local').Strategy;
const pool = require("./db/pool");
const pgPool = require("./db/pool");
const { Pool } = require("pg");
const PORT = process.env.PORT;




const app = express();


app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(__dirname + '/public'));


app.use(session({
  store: new pgSession({
    pool : pgPool,                
    tableName : "session",
  }),
  secret: 'secret',
  resave: false,
  saveUninitialized: true,
  resave: false,
  cookie: { maxAge: 1000 * 60 } // 30 Days
}));


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
