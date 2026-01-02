const express = require("express")
require("dotenv").config()

const authRouter = require("./routes/authRoute")
const userRouter = require("./routes/userRoute")
const subscriptionRouter = require("./routes/subscriptionRoute")
const { connectToMongoDB } = require("./database/mongoDB")

const PORT = process.env.PORT
const app = express()

app.use(express.json())
app.use("api/v1/auth", authRouter)
app.use("api/v1/users", userRouter)
app.use("api/v1/subscriptions", subscriptionRouter)

app.get("/", (req, res) => {
   res.send("Subscription Tracker is working!")
})

app.listen(PORT, async () => {
   console.log(`Subscription tracker listening at http://localhost:${PORT}`)

   //    await connectToMongoDB()
})
