const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const bcrypt = require("bcrypt");

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
  console.log(req.body);

  try {
    // Find user in the database based on email
    const user = await User.findOne({ email });

    if (user) {
      // Compare the provided password with the hashed password stored in the database
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (isPasswordValid) {
        // Passwords match, generate JWT token
        const token = jwt.sign({ email: user.email }, process.env.JWT_TOKEN, {
          expiresIn: "15d",
        });
        const id = user._id;
        res.json({ token, id });
        console.log("log in ");
      } else {
        // Passwords don't match, send 401 Unauthorized response
        res.status(401).json({ error: "Invalid email or password" });
      }
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

const getUserById = async (req, res) => {
  const userId = req.body.userId;

  try {
    const user = await User.findById(userId, { password: 0 }); // Exclude password field

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Send user details (excluding password) in the response
    res.status(200).json({ user: user.toObject({ getters: true }) });
  } catch (error) {
    console.error("Error finding user by ID:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const updateuser = async (re, res) => {
  const { userId, updatedData, password } = re.body;
  // console.log(password);

  try {
    const user = await User.findById(userId);

    if (!user) {
      console.log("user not found");

      return res.status(404).json({ error: "User not found" });
    }
    // console.log(password, user.password);
    // Verify the provided password

    if (password != user.password) {
      console.log("invalid password");
      return res.status(401).json({ error: "Unauthorized" });
    }

    // Check if the new email already exists in the database
    const existingUser = await User.findOne({
      email: updatedData.email,
      _id: { $ne: userId },
    });

    if (existingUser) {
      return res.status(400).json({
        error: "Email already exists. Please choose a different email.",
      });
    }

    // Update user details
    user.name = updatedData.name;
    user.email = updatedData.email;

    // Save the updated user to the database
    await user.save();

    res.json({ message: "User details updated successfully" });
  } catch (error) {
    console.error("Error updating user details:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  registerUser,
  LoginUser,
  verifyToken,
  getUserById,
  updateuser,
};
