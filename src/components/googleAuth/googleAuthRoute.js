const express = require("express");
const router = express.Router();
const googleAuthController = require("./googleAuthController");

router.post("/sign-up", googleAuthController.signup);
router.post("/sign-in", googleAuthController.signin);
module.exports = router;
