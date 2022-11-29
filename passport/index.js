const passport = require("passport");
const LocalStrategy = require("./passport-local");
const JwtStrategy = require("./passport-jwt");

passport.use(LocalStrategy);
passport.use(JwtStrategy);

module.exports = passport;
