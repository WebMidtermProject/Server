const express = require("express");
const router = express.Router();

const controller = require("./controller");

router.get("/get-all-users", controller.getAllUsers);
module.exports = router;
