const mongoose = require("mongoose");
const uniqueValidator = require('mongoose-unique-validator');
const crypto = require("crypto");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  hash: String,
  salt: String,
});

userSchema.plugin(uniqueValidator);

userSchema.methods.setPassword = function (password) {
  this.salt = crypto.randomBytes(16).toString("hex");
  this.hash = crypto
    .pbkdf2Sync(password, this.salt, 1000, 64, `sha256`)
    .toString("hex");
};

userSchema.methods.validatePassword = function (password) {
  let hash = crypto
    .pbkdf2Sync(password, this.salt, 1000, 64, `sha256`)
    .toString("hex");
  return this.hash === hash;
};

module.exports = mongoose.model("User", userSchema);