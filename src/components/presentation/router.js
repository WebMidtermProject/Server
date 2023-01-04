const express = require("express");
const router = express.Router();

const controller = require("./controller");

router.get("/", controller.getMyPresentation);
router.post("/create", controller.createPresentation);
router.get("/:id", controller.getPresentation);
router.delete("/:id",controller.deletePresentation);


router.post("/:presentation_id/slide/create", controller.createSlide)
router.get("/:presentation_id/slide", controller.getSlide)
router.get("/:presentation_id/slide/:id", controller.getSlideDetail)

module.exports = router;
