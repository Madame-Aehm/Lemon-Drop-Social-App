import express from "express";
import { getAllRecipes, getByID, postNewRecipe, deleteRecipe, updateRecipe, uploadImage } from "../controllers/recipesController.js";
import { multerUploads } from "../middlewares/multer.js";

const router = express.Router()


router.get("/", getAllRecipes);

router.post('/upload-image', multerUploads.single("image"), uploadImage);


router.get("/:id", getByID);
// router.get("method/:method", getByMethod);

router.post('/new-recipe', postNewRecipe)

router.delete('/:id', deleteRecipe)

router.patch('/:id', updateRecipe)

export default router