const express = require("express");
const AuthController = require("../controllers/AuthController");
const router = express.Router();

router.post("/login", AuthController.loginUser);
router.post("/register", AuthController.registerUser);

module.exports = router;
