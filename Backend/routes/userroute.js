const express = require("express");
const HttpError = require("../models/http-error");
const user_controller = require("../controllers/user-controller");
const { check } = require("express-validator");

const router = express.Router();
router.post(
  "/login",
  [check("email").isEmail(), check("password").notEmpty()],
  user_controller
);

module.exports = router;
