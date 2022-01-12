const { Router } = require("express");
const { register, login } = require("../controllers/userControllers");

const router = Router();

router.post("/login", login); // Login Users
router.post("/register", register); // Create Users

module.exports = router;
