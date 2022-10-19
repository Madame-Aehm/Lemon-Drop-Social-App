import mongoose from "mongoose";
import { recipeModel } from "../models/recipeModel.js";
import { userModel } from "../models/usersModel.js";
import { v2 as cloudinary } from "cloudinary";

const getAllRecipes = async (req, res) => {
  try {
    const all = await recipeModel.find({}).sort({createdAt: -1});
    if (all.length === 0) {
      return res.status(204).json({ msg: "Menu empty" });
    } 
    return res.status(200).json(all);
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};

const getByID = async (req, res) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(406).json({ error: "Invalid ID" })
  }
  try {
    const requested = await recipeModel.findOne({ _id: id })
      .populate({ path: "posted_by", select: ["username", "profile_picture.url"] })
      .populate({ path: "comments.posted_by", select: ["username", "profile_picture.url"] });
    if (!requested) {
      return res.status(404).json({ error: "No recipe with ID " + id });
    } 
    return res.status(200).json(requested);
  } catch(error) {
    res.status(500).json({ error: error })
  }
}

const uploadImage = async(req, res) => {
  try {
    const uploadResult = await cloudinary.uploader.upload(req.file.path, {
      folder: "recipe_images",
      return_delete_token: true,
    });
    return res.status(200).json({
      url: uploadResult.url,
      public_id: uploadResult.public_id
    });
  } catch (error) {
    res.status(500).json({ error: error });
  }
}

const postNewRecipe = async(req, res) => {
  try {
    const recipe = await recipeModel.create({ ...req.body, posted_by: req.user._id });
    if (!recipe) {
      return res.status(501).json({ error: "Recipe not submitted"})
    }
    const user = await userModel.findOneAndUpdate({ _id: req.user._id }, {
      $push: { posted_recipes: recipe._id, }
    })
    if (!user) {
      return res.status(206).json({ recipe: recipe, error: "Could not connect recipe with user" })
    }
    return res.status(200).json(recipe);
  } catch (error) { 
    res.status(500).json({ error: error })}
}

const deleteRecipe = async(req, res) => {
  const id = req.body._id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(406).json({ error: "Invalid ID" })
  }
  try {
    const recipe = await recipeModel.findOneAndDelete({ _id: id });
    if (!recipe) {
      return res.status(404).json({ error: "No recipe with ID " + id})
    }
    const user = await userModel.findOneAndUpdate({ _id: recipe.posted_by }, {
      $pull: { posted_recipes: recipe._id, }
    })
    if (!user) {
      return res.status(206).json({ error: "Recipe deleted, but could not connect with user" });
    }
    return res.status(200).json({ msg: "Recipe deleted" });
  } catch (error) {
    res.status(500).json({ error: error })
  }
}

const addComment = async(req, res) => {
  const recipeID = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(recipeID)) {
    return res.status(406).json({ error: "Invalid ID" })
  }
  try {
    const toSubmit = { ...req.body, posted_by: req.user._id }
    const recipe = await recipeModel.findOneAndUpdate({ _id: recipeID }, {
      $push: { comments: toSubmit }
    }, { new: true });
    if (!recipe) {
      return res.status(404).json({ error: "ID not found." })
    }
    return res.status(200).json(recipe);
  } catch (error) {
    return res.status(500).json({ error: error })
  }
}

const deleteComment = async(req, res) => {
  const recipeID = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(recipeID)) {
    return res.status(406).json({ error: "Invalid ID" })
  }
  try {
    const recipe = await recipeModel.findOneAndUpdate({ _id: recipeID }, {
      $pull: { comments: { _id: req.body._id } }
    }, { new: true });
    if (!recipe) {
      return res.status(404).json({ error: "ID not found." })
    }
    return res.status(200).json(recipe);
  } catch (error) {
    return res.status(500).json({ error: error });
  }
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

export { getAllRecipes, getByID, postNewRecipe, deleteRecipe, updateRecipe, 
  uploadImage, addComment, deleteComment }