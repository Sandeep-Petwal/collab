const express = require('express');
const authRoutes = express.Router();
const {registerUser, login, verifyEmail, verifyToken} = require("../controllers/authController");
const verifyRecaptcha = require("../middleware/verifyReCaptcha.js")


authRoutes.get("/", (req, res) => { res.json({ status: "Auth routes working !" }) })
authRoutes.post("/register", registerUser);  // user registration
authRoutes.get("/verify-email", verifyEmail); // email verification
authRoutes.post("/login", verifyRecaptcha,  login);               // user login

authRoutes.get("/verify-token", verifyToken);   // token verification



module.exports = authRoutes;