const HttpError = require("../models/http-error");
const { validationResult } = require("express-validator");
const User = require("../models/user");

const login = async (req, res, next) => {
  await User.findOne({ email: req.body.email }, function (err, user) {
    if (user === null) {
      return next(new HttpError("User not found.", 400));
    } else {
      if (user.validPassword(req.body.password)) {
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
  let newUser = new User();
  (newUser.name = req.body.name), (newUser.email = req.body.email);
  newUser.setPassword(req.body.password);

  newUser.save((err, User) => {
    if (err) {
        return next(new HttpError('Signing up failed.', 401));
    } else {
      return res.status(201).send({
        message: "User added successfully.",
      });
    }
  });
};

module.exports = { login, signup };
