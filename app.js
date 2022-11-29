const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

require("dotenv").config();
const cors = require("cors");
const passport = require("./passport/index");
/* const bodyParser = require("body-parser"); */

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const authRouter = require("./src/components/auth/authRouter");
const userAPIRouter = require("./src/components/user/userAPIRouter");
const googleAuthRouter = require("./src/components/googleAuth/googleAuthRoute");

const { cookie, append } = require("express/lib/response");

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(passport.initialize());
app.use(cors());
/* app.use(
  cors({
    origin: ["http://localhost:3001"],
    methods: "GET,POST,PUT,DELETE,OPTIONS",
  })
); */

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use(
  "/auth",
  passport.authenticate("local", { session: false }),
  authRouter
);
app.use("/api", userAPIRouter);

app.use("/google", googleAuthRouter);

/**
 *  This function is used verify a google account
 */

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
