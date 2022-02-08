const express = require("express");
const { roomControllers } = require("../controllers");

const router = express.Router();

router.route("/").get(roomControllers.getRooms);

router.route("/create").post(roomControllers.createRoom);

router
  .route("/:id")
  .patch(roomControllers.editRoom)
  .delete(roomControllers.deleteRoom);

module.exports = router;
