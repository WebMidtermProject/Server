const router = require("express").Router();
const googleAuthRouter = require("../googleAuth/googleAuthRoute");
const createError = require("http-errors");
const authRouter = require("../auth/authRouter");
const passport = require("../../../passport/index");
const JwtStrategy = require("passport-jwt").Strategy
const {ExtractJwt} = require("passport-jwt")
const jwt = require("jsonwebtoken");

const userRouter = require("../user/router");
const groupRouter = require("../group/router");
const presentationRouter = require("../presentation/router");

require("dotenv").config();

passport.use(new JwtStrategy({
  jwtFromRequest: ExtractJwt.fromHeader("api-token"),
  secretOrKey: process.env.ACCESS_TOKEN_SECRET
}, (user,done)=>{
  try{
    done(null, user)
  }catch(error){
    done(error,false)
  }
}))

router.use(passport.initialize());

router.use(
  "/auth",
  // passport.authenticate(
  //   "local",
  //   { session: false }
  // ),
  authRouter
);

router.use("/google", googleAuthRouter);
router.use("/user", passport.authenticate('jwt',{session: false}), userRouter);
router.use("/group", passport.authenticate('jwt',{session: false}), groupRouter);
router.use("/presentation", passport.authenticate('jwt',{session: false}), presentationRouter);

// catch 404 and forward to error handler
router.use(function (req, res, next) {
  next(createError(404));
});

// error handler
router.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = router;
