const mongoose = require("mongoose");

const mongodbURL = `mongodb+srv://Tarun:${process.env.REACT_APP_DB_PASS}@cluster0.4n8nv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

mongoose.connect(
  mongodbURL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (error) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Connected Successfully to MongoDB");
    }
  }
);

module.exports = mongoose;
