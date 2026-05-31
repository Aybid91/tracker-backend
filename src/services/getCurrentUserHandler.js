const { getPrisma } = require("../utils/prisma");

const getCurrentUserHandler = async (req, res) => {
  const userId = req.userId;
  try {
    const prisma = getPrisma();
    const user = await prisma.user_account.findFirst({
      where: { id: userId },
      select: {
        phone_number: true,
        user_profile: true,
      },
    });
    const currentUser = {
      phn: user.phone_number,
      id: user.user_profile.profile_string,
      userName: user.user_profile.user_name,
      joined: user.user_profile.created_at,
    };
    res.json({ data: currentUser, status: 1 });
  } catch (error) {
    console.log(error);
    res.json({ data: null, status: 0 });
  }
};
module.exports = getCurrentUserHandler;
