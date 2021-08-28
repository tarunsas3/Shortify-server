const User = require("../models/users");
const { hashPassword } = require("../utils/utils");

const resetPassword = async (req, res) => {
  console.log(req.body);
  let hashedPassword = await hashPassword(req.body.newPassword);
  User.findById(req.body.id, (err, result) => {
    if (result) {
      console.log(result);
      result.password = hashedPassword;
      result.randomString = "";
      result.save();
      res.json({ success: true, message: "Password changed successfully" });
    } else {
      res.json({
        success: false,
        message: "There was a problem in changing password",
      });
    }
  });
};

module.exports = resetPassword;
