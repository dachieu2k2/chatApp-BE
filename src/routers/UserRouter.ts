import express from "express";
import verify from "../middlewares/auth";
import { userControllers } from "../controllers";

const router = express.Router();

router.route("/filter").post(verify, userControllers.getAllUserNameFilter);

router.route("/").get(verify, userControllers.getAllUserName);

export default router;
