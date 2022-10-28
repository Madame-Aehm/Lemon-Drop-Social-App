import express from "express";
import { getAllRecipes, getByID, uploadImage, postNewRecipe, updateRecipe, deleteRecipe, addComment, deleteComment, addFavourite, deleteFavourite } from "../controllers/recipesController.js";
import { multerUploads } from "../middlewares/multer.js";
import jwtAuth from "../utils/jwtAuth.js";

const router = express.Router()

router.get("/", getAllRecipes);
router.get("/recipe/:id", getByID);

router.post('/upload-image', multerUploads.single("image"), uploadImage);
router.post('/new-recipe', jwtAuth, postNewRecipe);
router.patch('/update-recipe/:id', jwtAuth, updateRecipe);
router.delete('/delete-recipe', jwtAuth, deleteRecipe);

router.post('/add-comment/:id', jwtAuth, addComment);
router.patch('/delete-comment/:id', jwtAuth, deleteComment);

router.post('/add-favourite/:id', jwtAuth, addFavourite);
router.patch('/delete-favourite/:id', jwtAuth, deleteFavourite);

export default router