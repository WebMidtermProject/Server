const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const knex = require("../src/components/db/configs/db-connector")

const LocalStrategy = require("passport-local").Strategy;

module.exports = new LocalStrategy(
  {
    usernameField: "email",
    passwordField: "password",
  },
  async (email, pwd, done) => {
    try {
      if (!email || !pwd) {
        return done(null, false, {
          status: 401,
          msg: "Email and password are required",
        });
      }

      //check email existed
      const foundUser = await knex('User').where('email',email).first()
      if (foundUser !== undefined) {
        return done(null, false, {
          status: 401,
          msg: "Email or password is invalid",
        });
      }

      const isValidPassword = await bcryptjs.compare(pwd, foundUser.password);
      if (isValidPassword) {
        return done(null, foundUser, {
          status: 200,
          msg: "successful",
        });
      } else {
        return done(null, false, {
          status: 401,
          msg: "Email or password is invalid",
        });
      }
    } catch (err) {
      return done(err, false, { status: 404, msg: "Error!!!" });
    }
  }
);
