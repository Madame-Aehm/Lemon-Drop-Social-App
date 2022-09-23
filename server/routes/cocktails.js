import express from "express";
import { getAllCocktails, getStirredCocktails, getCocktailsByMethod } from "../controllers/cocktailsController.js";

const cocktailsRouter = express.Router()

cocktailsRouter.get("/test", (req, res) => {
  res.send({message: "testing message recieved"})
})

cocktailsRouter.get("/all", getAllCocktails);
cocktailsRouter.get("/stirred", getStirredCocktails);
cocktailsRouter.get("/all/:method", getCocktailsByMethod);
export default cocktailsRouter