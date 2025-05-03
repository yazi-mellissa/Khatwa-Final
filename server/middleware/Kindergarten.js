import jwt from "jsonwebtoken";

export const AuthenticationKindergarten = async (req, res, next) => {
  try {
    const token = req.header("Authorization");

    if (!token) {
      return res.status(401).json({ message: "Authentication failed: No token provided" });
    }

    const verified = jwt.verify(token, process.env.JWT_SECRET);

    if (verified.role !== "Kindergarten") {
      return res.status(403).json({ message: "Authentication failed: Not a kindergarten" });
    }
    
    req.Kindergarten = verified;
    next();
  } 
  catch (err) {
    res.status(500).json({ error: err.message });
  }
};



