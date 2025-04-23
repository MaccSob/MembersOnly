const express = require("express");
const path = require("node:path");
const app = express();
const { Router } = require("express");
const indexRouter = Router();
const bcrypt = require("bcryptjs");
const LocalStrategy = require('passport-local').Strategy;
const passport = require("passport");
const { Pool } = require("pg");
const pool = require("../db/pool");
const { body } = require("express-validator");

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

 // --------------------------------- GET ROUTES -------------------------

indexRouter.get("/signup", (req, res) => res.render("signup"));
indexRouter.get("/login", (req, res) => res.render("login"));
indexRouter.get("/new", (req, res) => res.render("new"));
indexRouter.get("/secretSite", (req, res) => res.render("secretSite"));
indexRouter.get('/', (req, res) => {
  res.render("index", { title: "Testtt", messages: messages, user: req.user }
  )
});

// ----------------------------------- POST ROUTES --------------------------

indexRouter.post("/signup", body('firstname').isLength({ min: 2 }),
body('lastname').isLength({min: 2}),
body('username').isEmail(),
body('password').isLength({ min: 5 }),
  async (req, res, next) => {
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




indexRouter.post("/new", function(req, res ) {
  const data = req.body;


  console.log("User: ", data.messageUser);
  console.log("Text: ", data.messageText);
  console.log("Date: ", new Date());

  messages.push({user: req.body.messageUser, text: req.body.messageText, added: new Date() });


  res.redirect("/")
});


  module.exports = indexRouter;