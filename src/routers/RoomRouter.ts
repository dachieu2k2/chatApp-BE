import express from "express";
import verify from "../middlewares/auth";
import { roomControllers } from "../controllers";

const router = express.Router();

router.route("/").get(verify, roomControllers.getRooms);

router.route("/create").post(verify, roomControllers.createRoom);
router.route("/invite").post(verify, roomControllers.invite);

router
  .route("/:id")
  .patch(verify, roomControllers.editRoom)
  .delete(verify, roomControllers.deleteRoom);

export default router;
