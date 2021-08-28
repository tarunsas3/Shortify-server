const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const cors = require("cors");
const PORT = process.env.PORT || 5000;
const {
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
} = require("./routes");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => root(req, res));

app.post("/login", (req, res) => login(req, res));

app.post("/signup", (req, res) => signup(req, res));

app.post("/verify-signup", (req, res) => verifySignup(req, res));

app.post("/forgot-password", (req, res) => passwordReset(req, res));

app.post("/verify-resetURL", (req, res) => verifyResetURL(req, res));

app.post("/reset-password", (req, res) => resetPassword(req, res));

app.post("/shorten-url", (req, res) => shortenURL(req, res));

app.post("/redirect-url", (req, res) => redirectURL(req, res));

app.get("/count", (req, res) => count(req, res));

app.listen(PORT, () => {
  console.log("Server started and running on port", PORT);
});
