const crypto = require("node:crypto");
const iterations = 100_000;
function generateSalt() {
  const salt = crypto.randomBytes(16);
  return salt.toString("base64");
}

/**
 *
 * @param {string} password
 * @returns {string} salt:::base64-encoded SHA-256 digest
 */
function hashPassword(password) {
  // Use the salt string bytes (utf8) then the password bytes, matching Java's
  // MessageDigest.update(salt.getBytes()); md.digest(password.getBytes());
  const salt = generateSalt();
  const hashedPassword = crypto
    .pbkdf2Sync(password, salt, iterations, 64, "sha512")
    .toString("hex");

  return `${salt}:::${hashedPassword}`;
}

/**
 *
 * @param {string} inputPsw
 * @param {string} storedPsw
 * @returns {boolean}
 */
function verifyPassword(inputPsw, storedPsw) {
  const [salt, hashedPassword] = storedPsw.split(":::");
  const hash = crypto
    .pbkdf2Sync(inputPsw, salt, iterations, 64, "sha512")
    .toString("hex");
  return hash === hashedPassword;
  return crypto.timingSafeEqual(
    Buffer.from(hash, "hex"),
    Buffer.from(hashedPassword, "hex"),
  );
}
module.exports = { hashPassword, verifyPassword };
