const express = require("express");
const router = express.Router();

const controller = require("./controller");

router.get("/profile", controller.getMyProfile);
router.post("/edit", controller.editName);

module.exports = router;
