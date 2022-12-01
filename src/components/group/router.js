const express = require("express");
const router = express.Router();

const controller = require("./controller");

router.get("/get-my-groups", controller.getMyGroups);
router.get("/get-joined-groups", controller.getJoinedGroups);

router.post("/create", controller.createGroup);
router.post("/invite", controller.inviteToGroup);
router.post("/add-attendee", controller.addAttendee);

router.get("/:id", controller.getGroupDetail);

module.exports = router;
