const express = require("express");
const path = require("node:path");
const app = express();
const { Router } = require("express");
const indexRouter = Router();



indexRouter.get("/signup", (req, res) => res.render("signup"));
indexRouter.get("/login", (req, res) => res.render("login"));
indexRouter.get("/new", (req, res) => res.render("new"));
indexRouter.get("/secretSite", (req, res) => res.render("secretSite"));


  module.exports = indexRouter;