const Link = require("../models/links");
const { generateRandomString, BASE_URL } = require("../utils/utils");

const shortenURL = async (req, res) => {
  let checkAlreadyExist = await Link.findOne({ longURL: req.body.longURL });
  let randomID = generateRandomString(6);
  let shortURL = BASE_URL + "/l/" + randomID;
  if (!checkAlreadyExist) {
    const link = new Link({
      longURL: req.body.longURL,
      shortURL: shortURL,
      createdAt: new Date(),
      hitCount: 0,
    });

    link.save();

    res.json({ success: true, ...link._doc });
  } else {
    res.json({ success: true, ...checkAlreadyExist._doc });
  }
};

module.exports = shortenURL;
