const mongoose = require("mongoose")

const Schema = mongoose.Schema

const subscriptionModel = new Schema(
   {
      name: {
         type: String,
         required: [true, "User's name required"],
         trim: true,
         minLength: 2,
         maxLength: 50,
      },
      price: {
         type: Number,
         required: [true, "Subscription price is required"],
         min: [0, "Price must be greater than 0"],
      },
      currency: {
         type: String,
         enum: ["USD", "EUR", "GBP"],
         default: "USD",
      },
   },
   {
      options: { timestamps: true },
   }
)

module.exports = mongoose.model("subscriptions", subscriptionModel)
