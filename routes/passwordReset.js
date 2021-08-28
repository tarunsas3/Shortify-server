const User = require("../models/users");
const nodemailer = require("nodemailer");
const { generateRandomString, BASE_URL } = require("../utils/utils");

const passwordReset = async (req, res) => {
  User.findOne({ email: req.body.email }, (err, result) => {
    if (result) {
      let randomString = generateRandomString(16);
      result.randomString = randomString;
      result.save();
      let resetURL = BASE_URL + "/verify/" + result._id + "/" + randomString;
      // Code to send to OTP via mail
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.MAIL_ID,
          pass: process.env.MAIL_PASS,
        },
      });

      const mail = {
        from: process.env.MAIL_ID,
        to: req.body.email,
        subject: "Password Reset",
        html: `<h2>Click on the following link to reset your password</h2><a href="${resetURL}">Click here</a>`,
      };

      transporter.sendMail(mail, (err, info) => {
        if (err) {
          console.log(err);
          console.log("There was an error in sending OTP");
          res.json({
            mailSent: false,
            message: "There was an error in sending OTP",
          });
        } else {
          res.json({
            mailSent: true,
            message: "Verification link sent successfully. Check your mail.",
          });
        }
      });
    } else {
      res.json({ success: false, message: "Email id is not registered" });
    }
  });
};

module.exports = passwordReset;
