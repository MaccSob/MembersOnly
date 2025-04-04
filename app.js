const bcrypt = require("bcryptjs");
require('dotenv').config()
const path = require("node:path");
const express = require("express");
const session = require("express-session");
const passport = require("passport");
const indexRouter = require("./routes/indexRouter");
const LocalStrategy = require('passport-local').Strategy;
const pool = require("./db/pool");
const PORT = process.env.PORT;

const app = express();



app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(session({ secret: "cats", resave: false, saveUninitialized: false }));
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));




passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const { rows } = await pool.query("SELECT * FROM users WHERE username = $1", [username]);
      const user = rows[0];

      if (!user) {
        return done(null, false, { message: "Incorrect username" });
      }
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        // passwords do not match!
        return done(null, false, { message: "Incorrect password" })
      }
      return done(null, user);
    } catch(err) {
      return done(err);
    }
  })
);passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
    const user = rows[0];

    done(null, user);
  } catch(err) {
    done(err);
  }
})

app.post("/signup", async (req, res, next) => {
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
app.use("/", indexRouter);


app.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/",
  })
);

app.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});
app.listen(PORT, () => console.log(`app listening on port ! ${PORT}`));
