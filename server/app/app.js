const express = require("express");

// init express
const app = express();

const cors = require("cors"); //allow cross origin
const session = require("express-session");
const passport = require("passport");
require("../strategies/local");

const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser"); //to parse the request 
const logger = require("../middlewares/logger"); //log request info

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(
  session({
    secret: process.env.SECRET,
    cookie: { maxAge: 30000 },
    saveUninitialized: false,
  })
);

app.use(logger);
app.use(cookieParser(process.env.SECRET));
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());

const gameRouter = require("../routes/game-routes");
const authRouter = require("../routes/auth");

app.use("/api/game", gameRouter);
app.use("/api/auth", authRouter);

module.exports = app;