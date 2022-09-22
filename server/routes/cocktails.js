import express from "express";
import { getAllCocktails, getStirredCocktails } from "../controllers/cocktailsController.js";

const cocktailsRouter = express.Router()

cocktailsRouter.get("/test", (req, res) => {
  res.send({message: "testing message recieved"})
})

cocktailsRouter.get("/all", getAllCocktails);
cocktailsRouter.get("/stirred", getStirredCocktails);
export default cocktailsRouter