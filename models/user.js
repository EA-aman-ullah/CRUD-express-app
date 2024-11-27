const Joi = require("joi");
const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 50,
    },
    phoneNo: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 50,
    },
    email: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 50,
    },
    gender: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 50,
    },
    title: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 50,
    },
  })
);

function validateUser(user) {
  const schema = Joi.object({
    _id: Joi.string(),
    __v: Joi.number(),
    name: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    gender: Joi.string().min(3).required(),
    title: Joi.string().min(3).required(),
    phoneNo: Joi.number().integer().min(10).required(),
  });

  return schema.validate(user);
}

exports.User = User;
exports.validate = validateUser;
