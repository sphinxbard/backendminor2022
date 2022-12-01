const HttpError = require("../models/http-error");
const { validationResult } = require("express-validator");
const User = require("../models/user");
const bodyParser = require("body-parser");

const login = async (req, res, next) => {
  const { email, password } = req.body;
  await User.findOne({ email: email }, function (err, user) {
    if (user === null) {
      return next(new HttpError("User not found.", 400));
    } else {
      if (user.validPassword(password)) {
        return res.status(201).send({
          message: "User Logged In",
        });
      } else {
        return next(new HttpError("Wrong password.", 400));
      }
    }
  });
};

const signup = async (req, res, next) => {
  const { name, email, password } = req.body;
  let newUser = new User();
  (newUser.name = name), (newUser.email = email);
  newUser.setPassword(password);

  await newUser.save((err, User) => {
    if (err) {
      return next(new HttpError("Signing up failed.", 401));
    } else {
      return res.status(201).send({
        message: "User added successfully.",
      });
    }
  });
};

module.exports = { login, signup };