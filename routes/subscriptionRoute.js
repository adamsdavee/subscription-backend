const { Router } = require("express")
const {
   createSubscription,
   getUserSubscriptions,
} = require("../controller/subscription.controller")
const { authorize } = require("../middlewares/auth.middleware")

const subscriptionRouter = Router()

subscriptionRouter.post("/", authorize, createSubscription)

subscriptionRouter.get("/users/:id", authorize, getUserSubscriptions)

module.exports = subscriptionRouter
