import express from "express";
import { getAllRecipes, getByMethod, getByID, postNewRecipe, deleteRecipe, updateRecipe } from "../controllers/recipesController.js";

const router = express.Router()

router.get("/test", (req, res) => {
  res.send({message: "testing message recieved"})
})

router.get("/", getAllRecipes);
router.get("/:id", getByID);
router.get("method/:method", getByMethod);

router.post('/', postNewRecipe)

router.delete('/:id', deleteRecipe)

router.patch('/:id', updateRecipe)

export default router