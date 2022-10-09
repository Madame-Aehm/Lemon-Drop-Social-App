import mongoose from "mongoose";
import { userModel } from "../models/usersModel.js";
import { encryptPassword, verifyPassword } from "../utils/bcrypt.js";
import { issueToken } from "../utils/jwt.js";
import { recipeModel } from "../models/recipeModel.js";
import { v2 as cloudinary } from "cloudinary";

const getAllUsers = async (req, res) => {
  const allUsers = await userModel
    .find({})
    // .populate({ path: "posted_recipes", select: ["name", "method"] });
  try {
    if (allUsers.length === 0) {
      req.status(200).json({
        error: "No users found"
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

const uploadImage = async(req, res) => {
  try {
    const uploadResult = await cloudinary.uploader.upload(req.file.path, {
      folder: "user_avatars",
      return_delete_token: true,
    });
    res.status(200).json({
      url: uploadResult.url,
      public_id: uploadResult.public_id
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: error });
  }
}

const deleteImage = async(req, res) => {
  try {
    const deleteResult = await cloudinary.uploader.destroy(req.body.public_id);
    res.status(200).json(deleteResult);
  } catch (error) {
    res.status(500).json("error: ", error);
  }
}

const newUser = async(req, res) => {
  console.log(req.body)
  try {
    const existingUser = await userModel.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(409).json({ error: "User with this email already exists." })
    }
    // insert validation here
    const hashedPassword = await encryptPassword(req.body.password);
    const user = new userModel({
      username: req.body.username,
      password: hashedPassword,
      email: req.body.email,
      profile_picture: req.body.profile_picture
    })
    try {
        await user.save();
        res.status(201).json(user) //change later to hide private details
      } catch (error) { 
        res.status(500).json({ error: error.message })}
  } catch(error) {
    res.status(401).json({ error: error.message })
  }
}

const deleteUser = async(req, res) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(500).json({ error: "Invalid ID" })
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
    return res.status(500).json({ error: "Invalid ID" })
  }
  const user = await userModel.findOneAndUpdate({ _id: id }, {
    ...req.body
  }, { new: true })
  if (!user) {
    return res.status(400).json({ error: "ID not found." })
  }
  res.status(200).json(user);
}

const login = async(req, res) => {
  try {
    const existingUser = await userModel.findOne({ email: req.body.email });
    if (!existingUser) { 
      res.status(401).json({ error: "No user registered with that email" })
    } else {
      const verified = await verifyPassword(req.body.password, existingUser.password);
      if (verified) {
        const token = issueToken(existingUser.id, existingUser.username, existingUser.profile_picture.url);
        res.status(201).json({
          user: {
            id: existingUser.id,
            username: existingUser.username,
            profile_picture: existingUser.profile_picture.url,
          },
          token: token
        });
      } else {
        res.status(401).json({ error: "Password doesn't match" });
      }
    }
  } catch(error) {
    console.log("login error: ", error)
  }
}

const getMyProfile = async (req, res) => {
  console.log(req);
}

export { getAllUsers, newUser, getUserByID, uploadImage, deleteImage, deleteUser, 
  updateUser, login, getMyProfile }