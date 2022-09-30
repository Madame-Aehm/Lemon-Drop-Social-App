import mongoose from "mongoose";
import { userModel } from "../models/usersModel.js";
import encryptPassword from "../utils/encryptPassword.js";
import { body, validationResult } from 'express-validator';
import { recipeModel } from "../models/recipeModel.js";

const getAllUsers = async (req, res) => {
  const allUsers = await userModel
    .find({})
    // .populate({ path: "posted_recipes", select: ["name", "method"] });
  try {
    if (allUsers.length === 0) {
      req.status(200).json({
        msg: "No users found"
      })
    } else {
      res.status(200).json(
        allUsers
      )
    }
  } catch (error) {
    res.status(500).json({
      msg: "Server failed",
      error: error
    });
  }
};

const getUserByID = async (req, res) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(500).json({msg: "Invalid ID"})
  }
  const requested = await userModel
    .find({ _id: id })
    .populate({ path: "posted_recipes" });
  if (requested.length === 0) {
    res.status(200).json({
      msg: "No user with ID " + id
    })
  } else {
    try {
      res.status(200).json(
        requested     //change later to hide private details
      )
    } catch(error) {
      res.status(500).json({
        msg: "Server failed",
        error: error
      })
    } 
  }
};

const uploadDI = async(req, res) => {

}

// const userValidation = (email, password, req) => {
//   email.isEmail();
//   password.isLength({ min: 6 });
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     return res.status(400).json({ errors: errors.array() })
//   }
// } //doesn't work

const newUser = async(req, res) => {
  try {
    const existingUser = await userModel.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(409).json({ msg: "User with this email already exists." })
    }
    // const validation = userValidation(res.body.email, res.body.password, req);
    // if (validation) {
    //   return validation;
    // }
    const hashedPassword = await encryptPassword(req.body.password);
    const user = new userModel({
      username: req.body.username,
      password: hashedPassword,
      email: req.body.email,
      favourite_drink: req.body.favourite_drink
    })
    try {
        await user.save();
        res.status(200).json(user) //change later to hide private details
      } catch (error) { 
        res.status(500).json({ error: error.message })}
  } catch(error) {
    res.status(401).json({ msg: "Registration failed", error: error })
  }
}

const deleteUser = async(req, res) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(500).json({msg: "Invalid ID"})
  }
  const user = await userModel.findOneAndDelete({ _id: id });
  if (!user) {
    return res.status(400).json({ error: "No user with ID " + id})
  }
  const recipesResult = deleteUserRecipes(id);
  res.status(200).json({ msg: "User deleted", recipesResult})
}

const deleteUserRecipes = async(id) => {
  try {
    await recipeModel.deleteMany({ posted_by: id });
    return "Recipes deleted";
  } catch (error) {
    return "error: ", error;
  }
}

const updateUser = async(req, res) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(500).json({msg: "Invalid ID"})
  }
  const user = await userModel.findOneAndUpdate({ _id: id }, {
    ...req.body
  }, { new: true })
  if (!user) {
    return res.status(400).json({ error: "ID not found." })
  }
  res.status(200).json(user);
}

export { getAllUsers, newUser, getUserByID, uploadDI, deleteUser, updateUser }