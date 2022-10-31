import mongoose from "mongoose";
import { recipeModel } from "../models/recipeModel.js";
import { userModel } from "../models/usersModel.js";
import { v2 as cloudinary } from "cloudinary";
import { checkIf } from "../utils/jsFunctions.js";

const getAllRecipes = async (req, res) => {
  try {
    const all = await recipeModel.find({}).sort({ createdAt: -1 });
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
    return res.status(200).json(
      uploadResult
    //   {
    //   uploadResult: uploadResult,
    //   url: uploadResult.url,
    //   public_id: uploadResult.public_id
    // }
    );
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
  const recipeID = req.body._id;
  if (!mongoose.Types.ObjectId.isValid(recipeID)) {
    return res.status(406).json({ error: "Invalid ID" })
  }
  try {
    const recipe = await recipeModel.findOneAndDelete({ _id: recipeID });
    if (!recipe) {
      return res.status(404).json({ error: "No recipe with ID " + recipeID})
    }
    const user = await userModel.updateOne({ _id: recipe.posted_by }, {
      $pull: { posted_recipes: recipe._id }
    })
    if (!user) {
      return res.status(206).json({ error: "Recipe deleted, but could not connect with user" });
    }
    recipe.favourited_by.forEach(async(e) => {
      await userModel.updateOne({ _id: e }, {
        $pull: { favourite_recipes: recipe._id }
      })
    });
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
  //attempted to check user is either poster of recipe or comment.
  // if (
  //   (req.body.commentPoster._id.toString() !== req.user._id.toString()) || 
  //   (req.body.recipePoster._id.toString() !== req.user._id.toString())) {
  //     return res.status(401).json({ error: "Recipe can only be deleted by OP of recipe or comment" });
  // }
  try {
    const recipe = await recipeModel.updateOne({ _id: recipeID }, {
      $pull: { comments: { _id: req.body.comment._id } }
    }, { new: true });
    if (!recipe) {
      return res.status(404).json({ error: "ID not found." })
    }
    return res.status(200).json({ message: "Comment deleted" });
  } catch (error) {
    return res.status(500).json({ error: error });
  }
}

const updateRecipe = async(req, res) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(406).json({ error: "Invalid ID" })
  }
  const isPoster = checkIf(id.toString(), req.user.posted_recipes);
  if (!isPoster) {
    return res.status(403).json({ error: "Recipe can only be updated by OP" })
  }
  try {
    const recipe = await recipeModel.findOneAndUpdate({ _id: id }, { ...req.body }, { new: true });
    if (!recipe) {
      return res.status(404).json({ error: "ID not found." })
    }
    return res.status(200).json(recipe);
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

const addFavourite = async(req, res) => {
  const recipeID = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(recipeID) || !mongoose.Types.ObjectId.isValid(req.user._id)) {
    return res.status(406).json({ error: "Invalid ID" })
  }
  const isPoster = checkIf(recipeID.toString(), req.user.posted_recipes);
  if (isPoster) {
    return res.status(403).json({ error: "Can't favourite own recipe" });
  }
  const alreadyFavourite = checkIf(recipeID.toString(), req.user.favourite_recipes);
  if (alreadyFavourite) {
    return res.status(203).json({ error: "Already favourited" })
  }
  try {
    const recipe = await recipeModel.updateOne({ _id: recipeID }, {
      $push: { favourited_by: req.user._id }
    });
    if (!recipe) {
      return res.status(404).json({ error: "ID not found." })
    }
    try {
      const user = await userModel.updateOne({ _id: req.user._id }, {
        $push: { favourite_recipes: req.params.id }
      })
      if (!user) {
        return res.status(204).json({ error: "Recipe updated, but user not found" });
      }
    return res.status(200).json({ message: "Favourite added" });
    } catch (error) {
      return res.status(500).json({ error: error.message })
    }
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

const deleteFavourite = async(req, res) => {
  const recipeID = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(recipeID) || !mongoose.Types.ObjectId.isValid(req.user._id)) {
    return res.status(406).json({ error: "Invalid ID" })
  }
  const alreadyFavourite = checkIf(recipeID.toString(), req.user.favourite_recipes);
  if (!alreadyFavourite) {
    return res.status(409).json({ error: "Recipe is not in favourites list" })
  }
  try {
    const recipe = await recipeModel.updateOne({ _id: recipeID }, {
      $pull: { favourited_by: req.user._id }
    });
    if (!recipe) {
      return res.status(404).json({ error: "ID not found." })
    }
    try {
      const user = await userModel.updateOne({ _id: req.user._id }, {
        $pull: { favourite_recipes: req.params.id }
      })
      if (!user) {
        return res.status(204).json({ error: "Recipe updated, but user not found" });
      }
    return res.status(200).json({ message: "Favourite removed" });
    } catch (error) {
      return res.status(500).json({ error: error.message })
    }
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const deleteFavsOnRecipeDelete = async() => {

}

export { getAllRecipes, getByID, postNewRecipe, deleteRecipe, updateRecipe, 
  uploadImage, addComment, deleteComment, addFavourite, deleteFavourite }