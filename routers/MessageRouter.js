const express = require("express");

const router = express.Router();

const { messageControllers } = require("../controllers");

router
  .route("/:roomId")
  .get(messageControllers.getMessages);

router
  .route("/create")
  .post(messageControllers.createMessage);

router
  .route("/:idMessage")
  .patch(messageControllers.editMessage)
  .delete(messageControllers.deleteMessage);

module.exports = router;
