const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
require("dotenv").config()

const userModel = require("../models/user.model")

const signUp = async (req, res, next) => {
   console.log("I am inside here")
   const session = await mongoose.startSession()
   session.startTransaction()

   try {
      // Check user if it exists
      const body = req.body
      console.log(body)
      const existingUser = await userModel.findOne({ email: body.email })
      console.log(existingUser)

      if (existingUser) {
         const error = new Error("User already exists")
         error.statusCode = 409

         throw error
      }

      // If user does not exist then hash the password:
      const salt = await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash(body.password, salt)

      console.log(hashedPassword)

      const newUsers = await userModel.create(
         [{ name: body.name, email: body.email, password: hashedPassword }],
         { session }
      )

      console.log(newUsers)

      const token = jwt.sign(
         { userId: newUsers[0]._id },
         process.env.JWT_SECRET,
         { expiresIn: process.env.JWT_EXPIRES_IN }
      )

      await session.commitTransaction()
      session.endSession()

      res.status(201).json({
         success: true,
         message: "New user created succesfully",
         data: {
            token,
            user: newUsers[0],
         },
      })
   } catch (error) {
      await session.abortTransaction()
      session.endSession()

      next(error)
   }
}

const signIn = async (req, res, next) => {
   try {
      const { email, password } = req.body

      const existingUser = await userModel.findOne({ email })

      if (!existingUser) {
         const error = new Error("User not found")
         error.statusCode = 404

         throw error
      }

      const isPasswordValid = await bcrypt.compare(
         password,
         existingUser.password
      )

      if (!isPasswordValid) {
         const error = new Error("Invalid password")
         error.statusCode = 401

         throw error
      }

      const token = jwt.sign(
         { userId: existingUser._id },
         process.env.JWT_SECRET,
         { expiresIn: process.env.JWT_EXPIRES_IN }
      )

      res.status(200).json({
         sucess: true,
         message: "User signed in successfully",
         data: {
            token,
            existingUser,
         },
      })
   } catch (error) {
      next(error)
   }
}

module.exports = {
   signUp,
   signIn,
}
