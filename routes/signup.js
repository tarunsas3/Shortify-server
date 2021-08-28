const User = require("../models/users");
const {
  hashPassword,
  generateRandomString,
  BASE_URL,
} = require("../utils/utils");
const nodemailer = require("nodemailer");

const signup = async (req, res) => {
  const hashedPassword = await hashPassword(req.body.password);
  const checkUserExists = await User.findOne({ email: req.body.email });
  if (!checkUserExists) {
    let randomString = generateRandomString(24);

    // create new user
    const user = new User({
      email: req.body.email,
      password: hashedPassword,
      randomString: randomString,
      isActive: false,
    });
    await user.save();

    let activationURL = `${BASE_URL}/activate/${randomString}`;

    // create transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL_ID,
        pass: process.env.MAIL_PASS,
      },
    });

    // create mail
    const mail = {
      from: process.env.MAIL_ID,
      to: req.body.email,
      subject: "Account Activation - Shortify",
      html: `<h2>Click on the following link to activate your profile</h2><a href="${activationURL}">Click here</a>`,
    };

    // send mail
    transporter.sendMail(mail, (err, info) => {
      if (err) {
        console.log(err);
        console.log("There was an error in sending activation link");
        res.json({
          signup: false,
          message: "There was an error in sending activation link",
        });
      } else {
        res.json({
          signup: true,
          message: "Activation link sent successfully. Check your mail.",
        });
      }
    });
  } else {
    res.json({ signup: false, message: "User already exists" });
  }
};

module.exports = signup;
