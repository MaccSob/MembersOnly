const express = require("express");
const path = require("node:path");
const app = express();
const { Router } = require("express");
const indexRouter = Router();;
;


indexRouter.get("/signup", (req, res) => res.render("signup"));
indexRouter.get("/login", (req, res) => res.render("login"));
app.get("/", (req, res) => {
  res.render("index", { user: req.user });
});

  module.exports = indexRouter;