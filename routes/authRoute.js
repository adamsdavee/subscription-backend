const { Router } = require("express")
const { signUp, signIn } = require("../controller/authController")

const authRouter = Router()

authRouter.post("/sign-up", signUp)

authRouter.post("/sign-in", signIn)

authRouter.get("/sign-out", (req, res) => {
   res.send("Auth router")
})

module.exports = authRouter
