const subscriptionModel = require("../models/subscription.model")

const createSubscription = async (req, res, next) => {
   try {
      const subscription = await subscriptionModel.create({
         ...req.body,
         user: req.user._id,
      })

      res.status(201).json({
         success: true,
         data: subscription,
      })
   } catch (err) {
      next(err)
   }
}

const getUserSubscriptions = async (req, res, next) => {
   try {
      if (req.user._id != req.params.id) {
         const error = new Error("You are not the owner of this account")
         error.status = 401

         throw error
      }

      const subscriptions = await subscriptionModel.find({
         user: req.params.id,
      })

      res.status(200).json({
         success: true,
         data: subscriptions,
      })
   } catch (err) {
      next(err)
   }
}

module.exports = {
   createSubscription,
   getUserSubscriptions,
}
