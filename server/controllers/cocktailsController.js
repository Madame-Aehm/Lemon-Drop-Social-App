import { cocktailModel } from "../models/cocktailsModel.js";

const getAllCocktails = async (req, res) => {
  const allCocktails = await cocktailModel.find({});
  try {
    if (allCocktails.length === 0) {
      req.status(200).json({
        msg: "Menu empty"
      })
    } else {
      res.status(200).json({
        allCocktails
      })
    }
  } catch (error) {
    res.status(500).json({
      msg: "Server failed",
      error: error
    });
  }
};

const getStirredCocktails = async (req, res) => {
  const stirredCocktails = await cocktailModel.find({ Method: "Stirred" });
  try {
    if (stirredCocktails.length === 0) {
      req.status(200).json({
        msg: "Menu empty"
      })
    } else {
      res.status(200).json({
        stirredCocktails
      })
    }
  } catch (error) {
    res.status(500).json({
      msg: "Server failed",
      error: error
    });
  }
};

export { getAllCocktails, getStirredCocktails }