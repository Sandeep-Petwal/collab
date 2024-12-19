const express = require('express');
const router = express.Router();
const authRoutes = require("../routes/authRoutes.js");
const docsRoutes = require("./docsRoutes.js");
const auth = require("../middleware/auth.js");

// testing
router.get("/", (req, res) => {
    res.json({ status: "Working." })
})

// auth
router.use("/auth", authRoutes);

// docs
router.use("/docs", auth, docsRoutes);


module.exports = router;