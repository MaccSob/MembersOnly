const express = require("express");
const path = require("node:path");
const app = express();
const { Router } = require("express");
const indexRouter = Router();



indexRouter.get("/signup", (req, res) => res.render("signup"));
indexRouter.get("/login", (req, res) => res.render("login"));
indexRouter.get("/new", (req, res) => res.render("new"));
indexRouter.get("/secretSite", (req, res) => res.render("secretSite"));


const messages = [
    {
      text: "Hi there!",
      user: "Amando",
      added: new Date()
    },
    {
      text: "Hello World!",
      user: "Charles",
      added: new Date()
    },
    {
    text: "Hey folks!",
    user: "Jacob",
    added: new Date()
    } 
 ];


 indexRouter.post("/new", function(req, res ) {
    const data = req.body;

    console.log("Text: ", data.messageText);
    console.log("User: ", data.messageUser);
    console.log("Date: ", new Date());

    messages.push({ text: req.body.messageText, user: req.body.messageUser, added: new Date() });






    res.redirect("/")
});


  module.exports = indexRouter;