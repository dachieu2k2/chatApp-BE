const express = require("express");
const AuthController = require("../controllers/AuthController");
const router = express.Router();

router
  .route("/login")
  .post(AuthController.loginUser);

module.exports = router;
