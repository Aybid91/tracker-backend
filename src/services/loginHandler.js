const { verifyPassword } = require("../utils/auth");
const { generateToken } = require("../utils/jwt");
const { getPrisma } = require("../utils/prisma");

const loginHandler = async (req, res) => {
  const { phn, psw } = req.body;
  if (!phn) return res.status(400).json({ error: "User phone required" });
  if (!psw) return res.status(400).json({ error: "User password required" });

  try {
    const prisma = getPrisma();
    const user = await prisma.user_account.findFirst({
      where: { phone_number: phn },
      select: {
        id: true,
        hashed_password: true,
        user_profile: { select: { profile_string: true } },
      },
    });
    if (!user?.id) {
      return res.status(409).json({ error: "User does not exist" });
    }
    const verified = verifyPassword(psw, user.hashed_password);
    if (!verified) {
      return res.status(401).json({ error: "Password do not match" });
    }
    const token = generateToken(user.user_profile.profile_string);
    res.cookie("tracker_token", token, {
      maxAge: 9000000,
      httpOnly: true,
      secure: true,
      // sameSite: 'strict'
    });
    res.status(200).json({ status: 1, message: "success" });
  } catch (error) {
    console.log("Error in Login handler", error);
    res.status(400).json({ error: error.message });
  }
};
module.exports = loginHandler;
