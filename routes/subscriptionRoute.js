const { Router } = require("express")

const subscriptionRouter = Router()

subscriptionRouter.get("/", (req, res) => {
   res.send("subscription router")
})

module.exports = subscriptionRouter
