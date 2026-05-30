const express = require("express");
const signupHandler = require("./src/services/signupHandler");
const loginHandler = require("./src/services/loginHandler");
const getCurrentUserHandler = require("./src/services/getCurrentUserHandler");
const { authMiddleware } = require("./src/middlewares/authMiddleware");
const logoutHandler = require("./src/services/logoutHandler");
const router = express.Router();
router.post("/signup", signupHandler);
router.post("/login", loginHandler);
router.get("/logout", logoutHandler);
router.post("/current-user", authMiddleware, getCurrentUserHandler);

router.get("/health", (req, res) => {
  console.log("healthy");
  return res.send("ok");
});
module.exports = router;
