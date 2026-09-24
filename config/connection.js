const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("Successfully connected to MongoDB");
}; //connect our application to MongoDB

module.exports = connectDB;
