import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import AsyncHandler from "express-async-handler";
const protect = AsyncHandler(async (re, res, next) => {
  let token;
  if (
    re.headers.authorization &&
    re.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = re.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_TOKEN);
      re.user = await User.findById(decoded.id).select("-password");
      next();
    } catch (err) {
      console.log(err);
      res.status(401);
      throw new Error("Not authorisation, token failed");
    }
  }
  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});
module.exports = { protect };
