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

    const user = new User({
      email: req.body.email,
      password: hashedPassword,
      randomString: randomString,
      isActive: false,
    });
    await user.save();

    let activationURL = `${BASE_URL}/activate/${randomString}`;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.REACT_APP_MAIL_ID,
        pass: process.env.REACT_APP_MAIL_PASS,
      },
    });

    const mail = {
      from: process.env.REACT_APP_MAIL_ID,
      to: req.body.email,
      subject: "Account Activation - shortify",
      html:
        `<h2>Dear User,</h2>` +
        `<p>Welcome to Shortify URL Shortner, One More Final Step before you become a member of the fastest growing family of 80,000+ users across 7 continents</p>` +
        `<p>Lets get your started, click the link below to get started</p>` +
        `<h2><a href="${activationURL}">Activate Account</a></h2>` +
        `<p>Looking forward to see you soon, we are pumped</p>`,
    };

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
