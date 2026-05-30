const { getPrisma } = require("../utils/prisma");
const { extractToken } = require("../utils/jwt");

const authMiddleware = async (req, res, next) => {
  try {
    const profileString = await extractToken(req.cookies.tracker_token);
    const db = getPrisma();
    const user = await db.user_profile.findFirst({
      where: { profile_string: profileString },
    });
    if (!user) {
      res.status(403).json({ status: 0, message: "Invalid user" });
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(403).send({
      status: 0,
      message:
        error.message || "Invalid Signature or UserId not present in request",
      error,
    });
  }
};
module.exports = { authMiddleware };
