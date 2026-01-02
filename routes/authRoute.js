const { Router } = require("express")

const authRouter = Router()

authRouter.get("/sign-up", (req, res) => {
   res.send("Auth router")
})

authRouter.get("/sign-in", (req, res) => {
   res.send("Auth router")
})

authRouter.get("/sign-out", (req, res) => {
   res.send("Auth router")
})

module.exports = authRouter
