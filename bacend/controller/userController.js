const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  // Using findOne to check if the user already exists
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400).json({
      message: "User already exists",
    });
    return;
  }

  // Creating a new user
  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(400).json({
      message: "Invalid user data",
    });
  }
});

const LoginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user in the database based on email and password
    const user = await User.findOne({ email, password });

    if (user) {
      // User found, generate JWT token
      const token = jwt.sign({ email: user.email }, process.env.JWT_TOKEN, {
        expiresIn: "15d",
      });
      const id = user._id;
      res.json({ token, id });
      console.log("log in ");
    } else {
      // User not found, send 401 Unauthorized response
      res.status(401).json({ error: "Invalid email or password" });
    }
  } catch (error) {
    // Handle any errors that occur during the database query
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const verifyToken = async (req, res, next) => {
  // console.log("now");
  const authHeader = req.header("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const token = authHeader.substring(7); // Remove 'Bearer ' prefix
  console.log(token);
  try {
    const decoded = jwt.verify(token, process.env.JWT_TOKEN);
    req.user = decoded;
    console.log("complete");
    return res.status(200).json({ message: "complete" });
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ error: "Invalid token" });
  }
};

module.exports = {
  registerUser,
  LoginUser,
  verifyToken,
};
