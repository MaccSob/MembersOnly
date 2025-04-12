const express = require("express");
const path = require("node:path");
const app = express();
const { Router } = require("express");
const indexRouter = Router();



indexRouter.get("/signup", (req, res) => res.render("signup"));
indexRouter.get("/login", (req, res) => res.render("login"));
indexRouter.get("/new", (req, res) => res.render("new"));
indexRouter.get("/secretSite", (req, res) => res.render("secretSite"));
indexRouter.get('/', (req, res) => {
  res.render("index", { title: "Testtt", messages: messages, user: req.user })
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