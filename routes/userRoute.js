const { Router } = require("express")
const { authorize } = require("../middlewares/auth.middleware")
const { getAllUsers, getOneUser } = require("../controller/userController")

const userRouter = Router()

userRouter.get("/", getAllUsers)

userRouter.get("/:id", authorize, getOneUser)

module.exports = userRouter
