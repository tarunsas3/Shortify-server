const User = require("../models/users");

const verifyResetURL = (req, res) => {
  User.findById(req.body.id, (err, result) => {
    if (result) {
      if (result.randomString === req.body.randomString) {
        res.json({ verified: true, message: "URL verified" });
      } else {
        res.json({ verified: false, message: "Invalid URL" });
      }
    } else {
      res.json({ verified: false, message: "Invalid URL" });
    }
  });
};

module.exports = verifyResetURL;
