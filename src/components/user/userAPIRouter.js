const express = require("express");
const router = express.Router();

const userAPIController = require("./userAPIController");

router.get("/get-all-users", userAPIController.getAllUsers);
module.exports = router;
