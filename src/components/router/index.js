const router = require("express").Router();
const userRouter = require("../user/router")
const googleAuthRouter = require("../googleAuth/googleAuthRoute")
const createError = require("http-errors");
const authRouter = require("../auth/authRouter");
const passport = require("../../../passport/index");
const jwt = require("jsonwebtoken");

require("dotenv").config();

middlewareUser = async (req, res, next) => {
  // check token
  const token = req.headers['api-token']
  if (token) {
    try {
      const json = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
      if (json) {
        console.log(json)
        req['currentUser'] = json
        next()
      }
    } catch (e) {
      return res.json({
        code: -100,
        error: 'ACCESS_DENIED'
      })
    }
  } else {
    return res.json({
      code: -100,
      error: 'ACCESS_DENIED'
    })
  }
}



router.use(passport.initialize());

router.use(
    "/auth",
    // passport.authenticate(
    //   "local",
    //   { session: false } /* , (req, user, js) => {
    //   const status = js.status;
    //   const msg = js.msg;
    //   if (status === 200) return res.status(200);
    //   else if (status === 401) {
    //     if (msg === "Email or password is invalid")
    //       return res.status(401).json({ err: msg });
    //     else if (msg === "Email and password are required")
    //       return res.status(401).json({ err: msg });
    //   } else if (status === 404) return res.status(404);
    // } */
    // ),
    authRouter
  );


router.use("/google", googleAuthRouter)
router.use("/user", middlewareUser,userRouter);

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
