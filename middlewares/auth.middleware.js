const jwt = require("jsonwebtoken")
require("dotenv").config()
const userModel = require("../models/user.model")

const authorize = async (req, res, next) => {
   try {
      let token

      if (
         req.headers.authorization &&
         req.headers.authorization.startsWith("Bearer")
      ) {
         token = req.headers.authorization.split(" ")[1]
      }

      if (!token) {
         return res.status(401).json({ message: "Unauthorized" })
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET)

      const user = await userModel.findById(decoded.userId)

      if (!user) return res.status(401).json({ message: "Unauthorized" })

      req.user = user

      next()
   } catch (error) {
      next(error)
   }
}

module.exports = {
   authorize,
}
