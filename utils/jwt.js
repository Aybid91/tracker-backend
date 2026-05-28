const jwt = require("jsonwebtoken");
const generateToken = (userId) => {
  console.log(process.env.JWT_SECRET);
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET not set in environment variables");
  }
  return jwt.sign(
    { sub: userId, iat: Math.floor(Date.now() / 1000) },
    process.env.JWT_SECRET,
    {
      expiresIn: "30d",
      algorithm: "HS256",
    },
  );
};

const extractToken = (token) => {
  if (!token) {
    throw new Error("jwt token missing");
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded?.sub) {
      throw new Error("Invalid token payload");
    }
    return decoded.sub;
  } catch (error) {
    throw new Error("Invalid token");
  }
};
module.exports = { generateToken, extractToken };
