const express = require("express");
const {
  LoginUser,
  registerUser,
  verifyToken,
} = require("../controller/userController");

const router = express.Router();

router.post("/login", LoginUser);
router.post("/register", registerUser);
router.get("/check_login", verifyToken);
modules.export = router;
