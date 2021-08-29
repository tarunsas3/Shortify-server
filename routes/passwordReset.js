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
        html:
          `<h2>Dear User,</h2>` +
          `<p>Let's get your sorted, click the link below to reset your password</p>` +
          `<h2><a href="${resetURL}">Reset Password</a></h2>` +
          `<p>welcome back to Shortify URL Shortner, Reset your password and become a member of the fastest growing family of 80,000+ users across 7 continents</p>` +
          `<p>Looking forward to see you soon. Glad you are back, we are pumped</p>`,
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
