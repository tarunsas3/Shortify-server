const db = require("../config/db");

const linkSchema = new db.Schema({
  longURL: String,
  shortURL: String,
  createdAt: Date,
  hitCount: Number,
});

const Link = new db.model("Link", linkSchema);

module.exports = Link;
