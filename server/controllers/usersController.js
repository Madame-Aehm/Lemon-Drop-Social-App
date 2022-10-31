import mongoose from "mongoose";
import { userModel } from "../models/usersModel.js";
import { encryptPassword, verifyPassword } from "../utils/bcrypt.js";
import { issueToken } from "../utils/jwt.js";
import { recipeModel } from "../models/recipeModel.js";
import { v2 as cloudinary } from "cloudinary";
import validator from 'validator';

const getAllUsers = async (req, res) => {
  try {
    const allUsers = await userModel.find({});
    if (allUsers.length === 0) {
      return req.status(204).json({ msg: "It's deserted." })
    } 
    return res.status(200).json(allUsers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUserByID = async (req, res) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(406).json({ error: "Invalid ID" })
  }
  try {
    const user = await userModel.findOne({ _id: id })
      .populate({ path: "posted_recipes" });
    if (!user) {
      return res.status(404).json({ error: "No user with ID " + id });
    }
    res.status(202).json({
      createdAt: user.createdAt,
      posted_recipes: user.posted_recipes,
      profile_picture: user.profile_picture,
      username: user.username,
      description: user.description,
      favourite_recipes: user.favourite_recipes,
      _id: user._id
    });
  } catch(error) {
    res.status(500).json({ error: error.message })
  } 
}

const uploadImage = async(req, res) => {
  try {
    const uploadResult = await cloudinary.uploader.upload(req.file.path, { folder: "user_avatars" });
    return res.status(200).json({
      url: uploadResult.secure_url,
      public_id: uploadResult.public_id
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

const deleteImage = async(req, res) => {
  try {
    const deleteResult = await cloudinary.uploader.destroy(req.body.public_id);
    return res.status(200).json(deleteResult);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

const newUser = async(req, res) => {
  if (!req.body.email || !req.body.username || !req.body.password) {
    return res.status(406).json({ error: "Email, password, and a username are required." });
  }
  if (req.body.username.trim() === "") {
    return res.status(406).json({ error: "Username can't be nothing." });
  }
  if (!validator.isEmail(req.body.email)) {
    return res.status(406).json({ error: "Email not valid." });
  }
  if (!validator.isStrongPassword(req.body.password, { minLength: 6, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 0, returnScore: false} )) {
    return res.status(406).json({ error: "Password not strong enough: minimum 6 characters, upper and lowercase letters, and a number." });
  }
  try {
    const existingUser = await userModel.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(409).json({ error: "User with this email already exists." })
    }
    const hashedPassword = await encryptPassword(req.body.password);
    const user = new userModel({
      username: req.body.username,
      password: hashedPassword,
      email: req.body.email,
      profile_picture: req.body.profile_picture
    })
    try {
        await user.save();
        return res.status(201).json({
          createdAt: user.createdAt,
          email: user.email,
          profile_picture: user.profile_picture,
          username: user.username,
          description: user.description,
          _id: user._id
        })
      } catch (error) { 
        return res.status(500).json({ error: error.message })}
  } catch(error) {
    return res.status(500).json({ error: error.message })
  }
}

const deleteUser = async(req, res) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(406).json({ error: "Invalid ID" })
  }
  try {
    const user = await userModel.findOneAndDelete({ _id: id });
    if (!user) {
      return res.status(404).json({ error: "No user with ID " + id})
    }
    const recipesResult = deleteUserRecipes(id);
    if (!recipesResult) {
      return res.status(206).json({ msg: "User delete, but recipes remain." })
    }
    return res.status(200).json({ msg: "User deleted" })
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

const deleteUserRecipes = async(id) => {
  try {
    await recipeModel.deleteMany({ posted_by: id });
    return true
  } catch (error) {
    return false
  }
}

const updateUser = async(req, res) => {
  const id = req.user._id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(406).json({ error: "Invalid ID" })
  }
  const user = await userModel.findOneAndUpdate({ _id: id }, {
    ...req.body
  }, { new: true })
  if (!user) {
    return res.status(404).json({ error: "ID not found." })
  }
  res.status(202).json({
    createdAt: user.createdAt,
    email: user.email,
    posted_recipes: user.posted_recipes,
    profile_picture: user.profile_picture,
    username: user.username,
    description: user.description,
    favourite_recipes: user.favourite_recipes,
    _id: user._id
  });
}

const login = async(req, res) => {
  if (!req.body.email || !req.body.password) {
    return res.status(406).json({ error: "Email and password are required." });
  }
  if (!validator.isEmail(req.body.email)) {
    return res.status(406).json({ error: "Email not valid." });
  }
  try {
    const existingUser = await userModel.findOne({ email: req.body.email });
    if (!existingUser) { 
      return res.status(404).json({ error: "No user registered with that email" })
    }
    const verified = await verifyPassword(req.body.password, existingUser.password);
    if (!verified) {
      return res.status(401).json({ error: "Password doesn't match" });
    } else {
      const token = issueToken(existingUser.id);
      return res.status(201).json({
        user: {
          createdAt: existingUser.createdAt,
          email: existingUser.email,
          posted_recipes: existingUser.posted_recipes,
          profile_picture: existingUser.profile_picture,
          username: existingUser.username,
          description: existingUser.description,
          favourite_recipes: existingUser.favourite_recipes,
          _id: existingUser._id
        },
        token: token
      });
    }
  } catch(error) {
    return res.status(500).json({ error: error.message });
  }
}

const getMyProfile = async (req, res) => {
  res.status(200).json({
    createdAt: req.user.createdAt,
    email: req.user.email,
    posted_recipes: req.user.posted_recipes,
    profile_picture: req.user.profile_picture,
    username: req.user.username,
    description: req.user.description,
    favourite_recipes: req.user.favourite_recipes,
    _id: req.user._id
  });
}

const verifyAndUpdatePW = async (req, res) => {
  const id = req.user._id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(406).json({ error: "Invalid ID" })
  }
  try {
    const user = await userModel.findOne({ _id: req.user._id });
    if (!user) { 
      return res.status(404).json({ error: "No user found" })
    }
    const verified = await verifyPassword(req.body.old_password, user.password);
    if (!verified) {
      return res.status(401).json({ error: "Password doesn't match" });
    }
    try {
      const hashedPassword = await encryptPassword(req.body.new_password);
      user.update({ password: hashedPassword }, (error, result) => {
        if (error) {
          return res.status(500).json({ error: error.message });
        }
          return res.status(200).json("Password updated");
      })
    } catch (error) {
      res.status(500).json({ error: error });
    }
  } catch (error) {
    res.status(500).json({ error: error })
  }
}

export { getAllUsers, newUser, getUserByID, uploadImage, deleteImage, deleteUser, 
  updateUser, login, getMyProfile, verifyAndUpdatePW }