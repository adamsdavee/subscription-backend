const { Router } = require("express")
const { authorize } = require("../middlewares/auth.middleware")
const arcjetMiddleware = require("../middlewares/arcjet.middleware")
const { getAllUsers, getOneUser } = require("../controller/userController")

const userRouter = Router()

userRouter.get("/", arcjetMiddleware, getAllUsers)

userRouter.get("/:id", arcjetMiddleware, authorize, getOneUser)

module.exports = userRouter
