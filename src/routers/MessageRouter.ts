import express from "express";
import verify from "../middlewares/auth";

const router = express.Router();

import { messageControllers } from "../controllers";

router.route("/:roomId").get(verify, messageControllers.getMessages);

router.route("/create").post(verify, messageControllers.createMessage);

router
  .route("/:idMessage")
  .patch(verify, messageControllers.editMessage)
  .delete(verify, messageControllers.deleteMessage);

export default router;
