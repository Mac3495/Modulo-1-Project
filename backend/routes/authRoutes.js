const express = require("express");
const { body } = require("express-validator");
require("dotenv").config();
const { registerUser, loginUser } = require("../controllers/auth.controller");

const router = express.Router();

router.post("/register", [
    body("name").isString().isLength({ min: 3 }),
    body("email").isEmail(),
    body("password").isLength({ min: 6 }),
], registerUser);

router.post("/login", [
    body("email").isEmail(),
    body("password").isLength({ min: 6 }),
], loginUser);

module.exports = router;
