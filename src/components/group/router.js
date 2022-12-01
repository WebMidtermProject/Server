const express = require("express");
const router = express.Router();

const controller = require("./controller");

router.get("/get-my-groups", controller.getAllGroups);
router.post("/create", controller.createGroup);

module.exports = router;
