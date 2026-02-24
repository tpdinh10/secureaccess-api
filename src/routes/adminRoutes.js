const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");
const { listUsers, updateUserRole } = require("../controllers/adminController");

const router = express.Router();

router.get("/users", authMiddleware, roleMiddleware("admin"), listUsers);
router.patch("/users/:id/role", authMiddleware, roleMiddleware("admin"), updateUserRole);

module.exports = router;