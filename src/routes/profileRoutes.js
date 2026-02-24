const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");
const { getProfile, getAdminWelcome } = require("../controllers/profileController");

const router = express.Router();

router.get("/profile", authMiddleware, getProfile);
router.get("/admin", authMiddleware, roleMiddleware("admin"), getAdminWelcome);

module.exports = router;