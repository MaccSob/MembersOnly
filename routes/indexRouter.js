const express = require("express");
const app = express();
const { Router } = require("express");
const indexRouter = Router();




indexRouter.get("/", (req, res) => res.render("index"));
indexRouter.get("/signup", (req, res) => res.render("signup"));
indexRouter.get("/login", (req, res) => res.render("login"));

indexRouter.post("/signup", async (req, res, next) => {
    try {
      await pool.query("INSERT INTO users (firstname, lastname, username,email,password) VALUES ($1, $2, $3, $4, $5)", [
        req.body.firstname,
        req.body.lastname,
        req.body.email,
        req.body.username,
        req.body.password,
      ]);
      res.redirect("/login");
    } catch(err) {
      return next(err);
    }
  });

  module.exports = indexRouter;