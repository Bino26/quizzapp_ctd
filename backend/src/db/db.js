const mongoose = require("mongoose");

const connectToDb = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://alinaM:3azzPHIVVhHN0sn0@cluster0.ki4rdbc.mongodb.net/Quizzes"
    );
    console.log(
      `Successfuly connect to the database at ${mongoose.connection.host}`
    );
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

module.exports = connectToDb;
