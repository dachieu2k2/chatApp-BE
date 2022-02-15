const express = require("express");
const { userControllers } = require("../controllers");

const router = express.Router();

router.route("/filter").post(userControllers.getAllUserNameFilter);

router.route("/").get(userControllers.getAllUserName);

module.exports = router;
