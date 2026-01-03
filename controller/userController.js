const mongoose = require("mongoose")
const userModel = require("../models/user.model")

const getAllUsers = async (req, res, next) => {
   try {
      const allUsers = await userModel.find({})

      res.status(200).json({
         sucess: true,
         data: allUsers,
      })
   } catch (error) {
      next(error)
   }
}

const getOneUser = async (req, res, next) => {
   try {
      const id = req.params.id

      const existingUser = await userModel.find({ _id: id })

      if (!existingUser) {
         const error = new Error("User does not exist")
         error.statusCode = 401

         throw error
      }

      res.status(200).json({
         success: true,
         data: req.user,
      })
   } catch (error) {
      next(error)
   }
}

module.exports = {
   getAllUsers,
   getOneUser,
}
