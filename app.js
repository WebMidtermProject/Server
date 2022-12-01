const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

require("dotenv").config();
const cors = require("cors");
const flash = require("connect-flash");

const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true}));
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");
app.use(logger("dev"));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());
app.use(flash());
/* app.use(
  cors({
    origin: ["http://localhost:3001"],
    methods: "GET,POST,PUT,DELETE,OPTIONS",
  })
); */


const baseRouter = require("./src/components/router/index")

app.use(
  "/",
  baseRouter
);



module.exports = app;
