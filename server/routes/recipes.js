import express from "express";
import { getAllRecipes, getByID, postNewRecipe, deleteRecipe, updateRecipe, uploadImage } from "../controllers/recipesController.js";
import { multerUploads } from "../middlewares/multer.js";
import jwtAuth from "../utils/jwtAuth.js";

const router = express.Router()


router.get("/", getAllRecipes);

router.post('/upload-image', multerUploads.single("image"), uploadImage);


router.get("/:id", getByID);
// router.get("method/:method", getByMethod);

router.post('/new-recipe', jwtAuth, postNewRecipe);

router.delete('/delete-recipe', jwtAuth, deleteRecipe)

router.patch('/:id', updateRecipe)

export default router