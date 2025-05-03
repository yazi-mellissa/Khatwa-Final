import jwt from "jsonwebtoken";
import Kindergarten from "../models/Kindergarten.js";
import roles from "../config/Roles.js";

export const verifyToken = async (req, res, next) => {
  try {
    let token = req.headers.authorization;

    if (!token) {
      return res.status(403).send("Access Denied");
    }

    if (token.startsWith("Bearer ")) {
      token = token.split(" ")[1];
    } 
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    req.user = await Kindergarten.findById(decoded.id).select('-password');
    req.role = req.user.role;
    if(req.user.role != roles.kindergarten) throw new Error("You are not allowed to access this route");
    next();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};