const { verifyPassword } = require("../utils/auth");

const loginHandler = (req, res) => {
  const { phn, psw } = req.body;
  console.log(psw);
  const verified = verifyPassword(
    psw,
    "dhmoNCV1UlaM3xrRmEFYgg==:::c22401fb5df06e2ec1c9aa6369a1cef720ae58a714587dc69213a701e381193be2ac82f3a4396b99c5ebb72db741af8f57e79dfd4980c76e3e2a2c6049bbdfce",
  );
  res.json({ verified });
};
module.exports = loginHandler;
