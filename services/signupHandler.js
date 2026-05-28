const { hashPassword } = require("../utils/auth");
const { generateToken } = require("../utils/jwt");

const signupHandler = async (req, res) => {
  const salt = 123;
  try {
    const { firstName, lastName, phn, psw } = req.body;
    const hashedPsw = hashPassword(psw, salt);
    const user_account = {
      id: 1,
      phone_number: phn,
      password: hashedPsw,
      user_profile: { firstName, lastName },
    };
    console.log("User account created: ", user_account, hashedPsw);
    const token = generateToken(user_account.id);
    res.json({ token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
module.exports = signupHandler;
