const express = require("express");
const verify = require("../middlewares/auth");
const { userControllers } = require("../controllers");

const router = express.Router();

router.route("/filter").post(verify, userControllers.getAllUserNameFilter);

router.route("/").get(verify, userControllers.getAllUserName);

module.exports = router;
