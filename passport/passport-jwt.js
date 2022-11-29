const JwtStrategy = require("passport-jwt").Strategy,
  ExtractJwt = require("passport-jwt").ExtractJwt;

require("dotenv").config();

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.ACCESS_TOKEN_SECRET;
module.exports = new JwtStrategy(opts, function (jwt_payload, done) {
  // passport-jwt already verified the signature. We can now use the jwt_payload.
  // We can do database request to get more information. But this may slow down our overall system.
  // Because jwt token check is perform on every secured api.
  done(null, jwt_payload);
});
