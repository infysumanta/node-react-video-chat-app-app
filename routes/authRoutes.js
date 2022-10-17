const express = require("express");
const router = express.Router();
const Joi = require("joi");
const validator = require("express-joi-validation").createValidator({});
const authController = require("./../controllers/authController");
const auth = require("./../middleware/auth");

const registerSchema = Joi.object({
  username: Joi.string().min(3).max(12).required(),
  password: Joi.string().min(6).max(12).required(),
  email: Joi.string().email().required(),
});

const loginSchema = Joi.object({
  password: Joi.string().min(6).max(12).required(),
  email: Joi.string().email().required(),
});

router.post(
  "/register",
  validator.body(registerSchema),
  authController.controllers.postRegister
);
router.post(
  "/login",
  validator.body(loginSchema),
  authController.controllers.postLogin
);

router.post("/testauth", auth, (req, res) => {
  res.send("request pass");
});

module.exports = router;
