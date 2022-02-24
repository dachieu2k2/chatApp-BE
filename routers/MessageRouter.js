const express = require("express");
const verify = require("../middlewares/auth");

const router = express.Router();

const { messageControllers } = require("../controllers");

router.route("/:roomId").get(verify, messageControllers.getMessages);

router.route("/create").post(verify, messageControllers.createMessage);

router
  .route("/:idMessage")
  .patch(verify, messageControllers.editMessage)
  .delete(verify, messageControllers.deleteMessage);

module.exports = router;
