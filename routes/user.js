const express = require("express");
const Joi = require("joi");
const mongoose = require("mongoose");
const router = express.Router();

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  gender: String,
  title: String,
  phoneNo: String,
});

const User = mongoose.model("User", userSchema);

router.get("/", (req, res) => {
  User.find()
    .then((result) => {
      result.length > 0
        ? res.send(result)
        : res.send("No documents matched the criteria.");
    })
    .catch((err) => res.status(400).send(err.message));
});

router.get("/:id", (req, res) => {
  User.find({ _id: req.params.id })
    .then((result) => {
      result.length > 0
        ? res.send(result)
        : res.send("No documents matched the criteria.");
    })
    .catch((err) => res.status(400).send(err.message));
});

router.post("/", (req, res) => {
  const result = validateCourse(req.body);
  if (result.error) {
    res.status(400).send(result.error.details);
    return;
  }

  const user = new User(result.value);

  user
    .save()
    .then((result) => res.send(result))
    .catch((err) => res.status(400).send(err.message));
});

router.put("/:id", (req, res) => {
  const result = validateCourse(req.body);
  if (result.error) {
    res.status(400).send(result.error.details);
    return;
  }
  User.replaceOne({ _id: req.params.id }, result.value)
    .then((result) => res.send(result))
    .catch((err) => res.send(err.message));
});

router.delete("/:id", (req, res) => {
  User.deleteOne({ _id: req.params.id })
    .then((result) => res.send(result))
    .catch((err) => res.send(err.message));
});

function validateCourse(user) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().email().required(), // Fixed `email()` instead of `Joi.email()`
    gender: Joi.string().min(3).required(), // Corrected "gander" to "gender"
    title: Joi.string().min(3).required(),
    phoneNo: Joi.number().integer().min(10).required(), // Adjusted for typical phone numbers
  });

  return schema.validate(user);
}

module.exports = router;
