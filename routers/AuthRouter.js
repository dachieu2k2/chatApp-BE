const express = require("express");

const AuthController = require("../controllers/AuthController");
const router = express.Router();
const verify = require("../middlewares/auth")

router.route("/").get(verify, AuthController.getUser);
router.route("/login").post(AuthController.loginUser);
router.route("/register").post(AuthController.registerUser);
router.route("/refresh").post(verify, AuthController.refresh);

module.exports = router;
