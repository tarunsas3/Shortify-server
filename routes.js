const root = require("./routes/root");
const login = require("./routes/login");
const signup = require("./routes/signup");
const passwordReset = require("./routes/passwordReset");
const verifyResetURL = require("./routes/verifyResetURL");
const resetPassword = require("./routes/resetPassword");
const verifySignup = require("./routes/verifySignup");
const shortenURL = require("./routes/shortenURL");
const redirectURL = require("./routes/redirectURL");
const count = require("./routes/count");

module.exports = {
  root,
  login,
  signup,
  passwordReset,
  verifyResetURL,
  resetPassword,
  verifySignup,
  shortenURL,
  redirectURL,
  count,
};
