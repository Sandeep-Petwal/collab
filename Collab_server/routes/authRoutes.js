const express = require('express');
const authRoutes = express.Router();
const {registerUser, login, verifyEmail, verifyToken} = require("../controllers/authController");



authRoutes.get("/", (req, res) => { res.json({ status: "Auth routes working !" }) })
authRoutes.post("/register", registerUser);  // user registration
authRoutes.get("/verify-email", verifyEmail); // email verification
authRoutes.post("/login", login);               // user login

authRoutes.get("/verify-token", verifyToken);   // token verification



module.exports = authRoutes;