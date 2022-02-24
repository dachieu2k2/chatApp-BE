const express = require("express");
const verify = require("../middlewares/auth");
const { roomControllers } = require("../controllers");

const router = express.Router();

router.route("/").get(verify, roomControllers.getRooms);

router.route("/create").post(verify, roomControllers.createRoom);
router.route("/invite").post(verify, roomControllers.invite);

router
  .route("/:id")
  .patch(verify, roomControllers.editRoom)
  .delete(verify, roomControllers.deleteRoom);

module.exports = router;
