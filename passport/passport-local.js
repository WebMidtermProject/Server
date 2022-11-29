const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fsPromises = require("fs").promises;
const path = require("path");

const LocalStrategy = require("passport-local").Strategy;
const users = require("../src/mock/user/users.json");

module.exports = new LocalStrategy(
  {
    usernameField: "email",
    passwordField: "password",
  },
  async (email, pwd, done) => {
    if (!email || !pwd) {
      return done(null, false, { error: "Email and password are required" });
    }

    const foundUser = users.find((user) => user.email === email);
    if (!foundUser) {
      return done(null, false, { error: "Email or password is invalid" });
    }

    const isValidPassword = await bcryptjs.compare(pwd, foundUser.password);
    if (isValidPassword) {
      return done(null, foundUser, { error: "Email or password is invalid" });
    } else {
      return done(null, false, { error: "Email or password is invalid" });
    }
  }
);
