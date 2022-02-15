const express = require('express')
const { userControllers } = require('../controllers')

const router = express.Router();

router
  .route("/")
  .get(userControllers.getAllUserName)

module.exports = router
