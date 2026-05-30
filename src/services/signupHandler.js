const { hashPassword } = require("../utils/auth");
const { generateToken } = require("../utils/jwt");
const { getPrisma } = require("../utils/prisma");
async function generateProfileIdString(db) {
  const suffix = process.env.PROFILE_SUFFIX;
  const rnd = () => Math.floor(10000000 + Math.random() * 90000000);
  for (let i = 0; i < 10; i++) {
    const s = suffix + String(rnd()).padStart(8, "0");
    const exists = await db.user_profile.findFirst({
      where: { profile_string: s },
    });
    if (!exists) return s;
  }
  return (
    suffix +
    Math.random()
      .toString(36)
      .replace(/[^0-9]/g, "")
      .slice(0, 8)
      .padEnd(8, "0")
      .toUpperCase()
  );
}
const signupHandler = async (req, res) => {
  const salt = process.env.PSW_SALT;
  try {
    const { userName, phn, psw } = req.body;
    const hashedPsw = hashPassword(psw, salt);
    const prisma = getPrisma();
    const exists = await prisma.user_account.findFirst({
      where: {
        phone_number: phn,
      },
      select: { id: true },
    });
    if (exists?.id) {
      return res.status(409).json({ error: "User already exists" });
    }
    const profileString = await generateProfileIdString(prisma);
    const user_account = {
      phone_number: phn,
      hashed_password: hashedPsw,
      status: "active",
      role: "user",
      user_profile: {
        create: {
          user_name: userName,
          profile_string: profileString,
        },
      },
    };
    const user = await prisma.user_account.create({
      data: user_account,
    });
    console.log("User account created: ", user.id);
    const token = generateToken(profileString);
    res.status(200).json({ token });
  } catch (error) {
    console.log("Error in Signup handler", error);
    res.status(400).json({ error: error.message });
  }
};
module.exports = signupHandler;
