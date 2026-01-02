const mongoose = require("mongoose")

const Schema = mongoose.Schema

const userModel = new Schema(
   {
      name: {
         type: String,
         required: [true, "User's name required"],
         trim: true,
         minLength: 2,
         maxLength: 50,
      },
      email: {
         type: String,
         required: [true, "User's name required"],
         trim: true,
         unique: true,
         minLength: 2,
         maxLength: 50,
         match: [
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            "Please enter a valid email address",
         ],
      },
      password: {
         type: String,
         required: true,
         minLength: 6,
      },
   },
   {
      options: { timestamps: true },
   }
)

module.exports = mongoose.model("users", userModel)
