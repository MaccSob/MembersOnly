const path = require("node:path");
const { Pool } = require("pg");
const express = require("express");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require('passport-local').Strategy;
const PORT = process.env.PORT;




const app = express();
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");


app.get("/", (req, res) => res.render("index"));

app.listen(PORT, () => console.log(`app listening on port ! ${PORT}`));
