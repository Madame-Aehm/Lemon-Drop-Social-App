import express from "express";
import { getAllRecipes, getByID, uploadImage, postNewRecipe, updateRecipe, deleteRecipe, addComment, deleteComment, addFavourite, deleteFavourite } from "../controllers/recipesController.js";
import { multerUploads } from "../middlewares/multer.js";
import jwtAuth from "../utils/jwtAuth.js";
import cors from 'cors';

const router = express.Router()

const allowedOrigins = "https://lemon-drop-recipes.vercel.app";
const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error("Restricted by CORS"))
    }
  }
}

router.get("/", cors(), getAllRecipes);
router.get("/recipe/:id", cors(), getByID);

router.post('/upload-image', cors(corsOptions), multerUploads.single("image"), uploadImage);
router.post('/new-recipe', cors(corsOptions), jwtAuth, postNewRecipe);
router.patch('/update-recipe/:id', cors(corsOptions), jwtAuth, updateRecipe);
router.delete('/delete-recipe', cors(corsOptions), jwtAuth, deleteRecipe);

router.post('/add-comment/:id', cors(corsOptions), jwtAuth, addComment);
router.patch('/delete-comment/:id', cors(corsOptions), jwtAuth, deleteComment);

router.post('/add-favourite/:id', cors(corsOptions), jwtAuth, addFavourite);
router.patch('/delete-favourite/:id', cors(corsOptions), jwtAuth, deleteFavourite);

export default router