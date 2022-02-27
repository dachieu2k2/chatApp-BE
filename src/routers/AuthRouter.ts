import express from "express";

import AuthController from "../controllers/AuthController";
const router = express.Router();
import verify from "../middlewares/auth";

router.route("/").get(verify, AuthController.getUser);
router.route("/login").post(AuthController.loginUser);
router.route("/register").post(AuthController.registerUser);
router.route("/refresh").post(verify, AuthController.refresh);

export default router;
