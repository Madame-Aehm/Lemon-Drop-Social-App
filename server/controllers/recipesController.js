import mongoose from "mongoose";
import { recipeModel } from "../models/recipeModel.js";
import { userModel } from "../models/usersModel.js";
import { v2 as cloudinary } from "cloudinary";

const getAllRecipes = async (req, res) => {
  const all = await recipeModel
    .find({})
    // .sort({createdAt: -1})
    // .populate({ path: "posted_by", select: "username"});
  try {
    if (all.length === 0) {
      req.status(200).json({
        msg: "Menu empty"
      })
    } else {
      res.status(200).json(
        all
      )
    }
  } catch (error) {
    res.status(500).json({
      msg: "Server failed",
      error: error
    });
  }
};

const getByID = async (req, res) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(500).json({msg: "Invalid ID"})
  }
  const requested = await recipeModel
    .find({ _id: id })
    .populate({ path: "posted_by", select: "username"});
  if (requested.length === 0) {
    res.status(200).json({
      msg: "No recipe with ID " + id
    })
  } else {
    try {
      res.status(200).json(
        requested
      )
    } catch(error) {
      res.status(500).json({
        msg: "Server failed",
        error: error
      })
    }
  }
}

const uploadImage = async(req, res) => {
  try {
    const uploadResult = await cloudinary.uploader.upload(req.file.path, {
      folder: "recipe_images",
      return_delete_token: true,
    });
    res.status(200).json({
      url: uploadResult.url,
      public_id: uploadResult.public_id
    });
  } catch (error) {
    res.status(500).json({ error: error });
  }
}

const postNewRecipe = async(req, res) => {
  try {
    const recipe = await recipeModel.create(req.body);
    res.status(200).json(recipe);
    await userModel.findOneAndUpdate({ _id: recipe.posted_by }, {
      $push: { posted_recipes: recipe._id, }
    })
  } catch (error) { 
    res.status(500).json({ error: error })}
}

// const getByMethod = async (req, res) => {
//   const requested = await recipeModel
//     .find({ method: req.params.method })
//     .populate({ path: "posted_by", select: "username"});
//   if (requested.length === 0) {
//     res.status(200).json({
//       msg: "No recipe with '" + req.params.method + "' method."
//     })
//   } else {
//     try {
//       res.status(200).json(
//         requested
//       )
//     } catch(error) {
//       res.status(500).json({
//         msg: "Server failed",
//         error: error
//       })
//     }
//   }
// }

const deleteRecipe = async(req, res) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(500).json({ error: "Invalid ID" })
  }
  const recipe = await recipeModel.findOneAndDelete({ _id: id });
  if (!recipe) {
    return res.status(400).json({ error: "No recipe with ID " + id})
  }
  res.status(200).json({ msg: "Recipe deleted" });
}

const updateRecipe = async(req, res) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(500).json({ error: "Invalid ID" })
  }
  const recipe = await recipeModel.findOneAndUpdate({ _id: id }, {
    ...req.body
  }, { new: true })
  if (!recipe) {
    return res.status(400).json({ error: "ID not found." })
  }
  res.status(200).json(recipe);
}

export { getAllRecipes, getByID, postNewRecipe, deleteRecipe, updateRecipe, uploadImage }