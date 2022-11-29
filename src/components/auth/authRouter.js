const express = require("express");
const router = express.Router();
const authController = require("./authController");

//////////////////////////////// GET ////////////////////////////////

//////////////////////////////// POST ////////////////////////////////
router.post("/login", authController.login);

router.post("/register", authController.register);

module.exports = router;
