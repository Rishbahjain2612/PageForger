const express = require("express");
const {
  LoginUser,
  registerUser,
  verifyToken,
  getUserById,
} = require("../controller/userController");

const router = express.Router();

router.post("/login", LoginUser);
router.post("/register", registerUser);
router.post("/check_login", verifyToken);
router.post("/getdetails", getUserById);
module.exports = router;
