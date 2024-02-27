const express = require("express");
const {
  LoginUser,
  registerUser,
  verifyToken,
  getUserById,
  updateuser,
  savedata,
  getdata,
} = require("../controller/userController");

const router = express.Router();

router.post("/login", LoginUser);
router.post("/register", registerUser);
router.post("/check_login", verifyToken);
router.post("/getdetails", getUserById);
router.post("/update", updateuser);
router.post("/post", savedata);
router.post("/get", getdata);

module.exports = router;
