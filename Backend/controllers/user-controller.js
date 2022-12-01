const HttpError = require("../models/http-error");
//const { v4: uuidv4 } = require("uuid");
const { validationResult } = require("express-validator");
const User = require("../models/user");

const login = async (req, res, next) => {
  await User.findOne({ email : req.body.email }, function(err, user) {
        if (user === null) {
            return res.status(400).send({
                message : "User not found."
            });
        }
        else {
            if (user.validPassword(req.body.password)) {
                return res.status(201).send({
                    message : "User Logged In",
                })
            }
            else {
                return res.status(400).send({
                    message : "Wrong Password"
                });
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
        return res.status(400).send({
          message: "Failed to add user.",
        });
      } else {
        return res.status(201).send({
          message: "User added successfully.",
        });
      }
    });
}

module.exports = { login, signup };