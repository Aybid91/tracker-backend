const express = require("express");
const signupHandler = require("./services/signupHandler");
const loginHandler = require("./services/loginHandler");
const router = express.Router();
router.post("/signup", signupHandler);
router.post("/login", loginHandler);
router.get("/health", (req, res) => {
  console.log("healthy");
  return res.send("ok");
});
module.exports = router;
