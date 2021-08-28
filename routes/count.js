const Link = require("../models/links");

const count = async (req, res) => {
  let thirtyDays = new Date();
  let currentDay = new Date();
  let oneDay = new Date();
  oneDay.setDate(oneDay.getDate() - 1);
  thirtyDays.setDate(thirtyDays.getDate() - 30);
  let thirtyDaysRecord = await Link.find({
    createdAt: {
      $gte: new Date(thirtyDays),
      $lte: new Date(currentDay),
    },
  });
  let oneDayRecord = await Link.find({
    createdAt: {
      $gte: new Date(oneDay),
      $lte: new Date(currentDay),
    },
  });

  res.json({ thirtyDaysRecord, oneDayRecord });
};

module.exports = count;
