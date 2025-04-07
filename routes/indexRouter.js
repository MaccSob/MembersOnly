const express = require("express");
const path = require("node:path");
const app = express();
const { Router } = require("express");
const indexRouter = Router();


const messages = [
  {
    text: "Test1341!",
    user: "Juno",
    added: new Date()
  },
  {
    text: "Test1222!",
    user: "Andy",
    added: new Date()
  },
  {
  text: "Test1!",
  user: "Brad",
  added: new Date()
  } 
];


indexRouter.get("/signup", (req, res) => res.render("signup"));
indexRouter.get("/login", (req, res) => res.render("login"));
indexRouter.get("/new", (req, res) => res.render("new"));
indexRouter.get("/secretSite", (req, res) => res.render("secretSite"));
indexRouter.get('/', (req, res) => {
  res.render("index", { title: "Testtt", messages: messages })
});

indexRouter.post("/new", function(req, res ) {
  const data = req.body;

  console.log("Text: ", data.messageText);
  console.log("User: ", data.messageUser);
  console.log("Date: ", new Date());

  messages.push({ text: req.body.messageText, user: req.body.messageUser, added: new Date() });






  res.redirect("/")
});
















  module.exports = indexRouter;