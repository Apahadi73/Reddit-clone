import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/User.js";

const authenticate = asyncHandler(async (req, res, next) => {
  let token;

  // checks the authorization in the request header and checks whether it has "Bearer in it" and if it has valid token and modifies the req body
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // token is received as "Bearer tokenString"
      token = req.headers.authorization.split(" ")[1];

      // we verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // removes password from User instance when it's added to the user object of the request body
      req.user = await User.findById(decoded.id).select("-password");

      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

export { authenticate };
