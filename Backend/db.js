const mongoose = require("mongoose");
const mongoUrl = "mongodb://127.0.0.1:27017/Notes";

const connectTOMongo = async () => {
  try {
    await mongoose.connect(mongoUrl);
    console.log("connected to mongod");
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = connectTOMongo;
