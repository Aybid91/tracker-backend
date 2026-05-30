const getCurrentUserHandler = async (req, res) => {
  try {
    const user = req.user;
    res.json({ data: user });
  } catch (error) {
    console.log(error);
  }
};
module.exports = getCurrentUserHandler;
