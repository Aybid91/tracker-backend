const logoutHandler = async (req, res) => {
  res.clearCookie("tracker_token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });

  res.json({ success: true, status: 1, message: "logout success" });
};
module.exports = logoutHandler;
