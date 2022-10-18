import express from "express";
import { getAllRecipes, getByID, postNewRecipe, deleteRecipe, updateRecipe, uploadImage, addComment, deleteComment } from "../controllers/recipesController.js";
import { multerUploads } from "../middlewares/multer.js";
import jwtAuth from "../utils/jwtAuth.js";

const router = express.Router()


router.get("/", getAllRecipes);
router.get("/:id", getByID);
router.post('/upload-image', multerUploads.single("image"), uploadImage);
router.post('/new-recipe', jwtAuth, postNewRecipe);
router.patch('/:id', jwtAuth, updateRecipe);
router.post('/add-comment/:id', jwtAuth, addComment);
router.patch('/delete-comment/:id', jwtAuth, deleteComment);
router.delete('/delete-recipe', jwtAuth, deleteRecipe);

// router.get("method/:method", getByMethod);

export default router