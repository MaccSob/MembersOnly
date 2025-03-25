const path = require("node:path");
const { Pool } = require("pg");
const express = require("express");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require('passport-local').Strategy;
const PORT = process.env.PORT;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_USER = process.env.DB_USER;
const DB_HOST = process.env.DB_HOST;
const DB_PORT = process.env.DB_PORT;
const DB_NAME = process.env.DB_NAME;

const pool = new Pool({
    host: DB_HOST, 
  user: DB_USER,
  database: DB_NAME,
  password: DB_PASSWORD,
  port: DB_PORT
  });
  

const app = express();
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(session({ secret: "cats", resave: false, saveUninitialized: false }));
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));


app.get("/", (req, res) => res.render("index"));
app.get("/signup", (req, res) => res.render("signup"));

app.post("/signup", async (req, res, next) => {
    try {
      await pool.query("INSERT INTO users (firstname, lastname, username,email,password) VALUES ($1, $2, $3, $4, $5)", [
        req.body.firstname,
        req.body.lastname,
        req.body.email,
        req.body.username,
        req.body.password,
      ]);
      res.redirect("/");
    } catch(err) {
      return next(err);
    }
  });

app.listen(PORT, () => console.log(`app listening on port ! ${PORT}`));
