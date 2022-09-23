import { cocktailModel } from "../models/cocktailsModel.js";

const getAllCocktails = async (req, res) => {
  const allCocktails = await cocktailModel.find();
  try {
    if (allCocktails.length === 0) {
      req.status(200).json({
        msg: "Menu empty"
      })
    } else {
      res.status(200).json(
        allCocktails
      )
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
      res.status(200).json(
        stirredCocktails
      )
    }
  } catch (error) {
    res.status(500).json({
      msg: "Server failed",
      error: error
    });
  }
};

const getCocktailsByMethod = async (req, res) => {
  console.log("req", req.params.Method);
  const requestedCocktails = await cocktailModel.find({ method: req.params.method });
  console.log(requestedCocktails)
  if (requestedCocktails.length === 0) {
    res.status(200).json({
      msg: "No cocktails with '" + req.params.method + "' method."
    })
  } else {
    try {
      res.status(200).json(
        requestedCocktails
      )
    } catch(error) {
      res.status(500).json({
        msg: "Server failed"
      })
    }
  }
}

const LIT = new cocktailModel({
  name: "Long Island Iced Tea",
  method: "Shaken",
  ingredients: [{ingredient: "vodka", quantity: 15, measure: "ml"},
                {ingredient: "rum", quantity: 15, measure: "ml"},
                {ingredient: "triple sec", quantity: 15, measure: "ml"},
                {ingredient: "gin", quantity: 15, measure: "ml"},
                {ingredient: "tequila", quantity: 15, measure: "ml"},
                {ingredient: "lemon juice", quantity: 30, measure: "ml"},
                {ingredient: "cola", quantity: 30, measure: "ml"},
                {ingredient: "lemon wedge", quantity: 1, measure: "item"}],
  instructions: ["Step 1: Pour all liquors and lemon juice into cocktail shaker with ice.",
                "Step 2: Shake well.",
                "Step 3: Strain over fresh ice.",
                "Step 4: Top with cola and garnish with lemon wedge. Enjoy!"]
})


export { getAllCocktails, getStirredCocktails, getCocktailsByMethod }