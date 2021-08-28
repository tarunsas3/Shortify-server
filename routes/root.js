const User = require("../models/users");
const Link = require("../models/links");

const root = async (req, res) => {
  let users = await User.find({});
  let links = await Link.find({});
  res.json({ users, links });
};

module.exports = root;
