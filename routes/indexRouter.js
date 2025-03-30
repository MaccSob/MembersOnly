const express = require("express");
const app = express();
const { Router } = require("express");
const indexRouter = Router();
const passport = require("passport");
const LocalStrategy = require('passport-local').Strategy;




indexRouter.get("/", (req, res) => res.render("index"));
indexRouter.get("/signup", (req, res) => res.render("signup"));
indexRouter.get("/login", (req, res) => res.render("login"));


  module.exports = indexRouter;