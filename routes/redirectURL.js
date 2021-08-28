const Link = require("../models/links");

const redirectURL = async (req, res) => {
  Link.findOne({ shortURL: req.body.url }, async (err, result) => {
    if (result) {
      result.hitCount = result.hitCount + 1;
      await result.save();
      res.json({ success: true, ...result._doc });
    } else {
      res.json({ success: false });
    }
  });
};

module.exports = redirectURL;
