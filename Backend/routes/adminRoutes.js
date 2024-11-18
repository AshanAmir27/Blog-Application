const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController"); // Ensure the path is correct

// Assuming you have a login route in your admin controller
router.post("/login", adminController.adminLogin); // Ensure adminLogin is defined in adminController

module.exports = router;
