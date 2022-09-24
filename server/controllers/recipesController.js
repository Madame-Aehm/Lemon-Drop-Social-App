import { recipeModel } from "../models/recipeModel.js";

const getAllRecipes = async (req, res) => {
  const all = await recipeModel
    .find()
    .populate({ path: "posted_by", select: "username"});
  try {
    if (all.length === 0) {
      req.status(200).json({
        msg: "Menu empty"
      })
    } else {
      res.status(200).json(
        all
      )
    }
  } catch (error) {
    res.status(500).json({
      msg: "Server failed",
      error: error
    });
  }
};

const getByMethod = async (req, res) => {
  const requested = await recipeModel
    .find({ method: req.params.method })
    .populate({ path: "posted_by", select: "username"});
  if (requested.length === 0) {
    res.status(200).json({
      msg: "No recipe with '" + req.params.method + "' method."
    })
  } else {
    try {
      res.status(200).json(
        requested
      )
    } catch(error) {
      res.status(500).json({
        msg: "Server failed",
        error: error
      })
    }
  }
}

const getByID = async (req, res) => {
  const requested = await recipeModel
    .find({ _id: req.params.id })
    .populate({ path: "posted_by", select: "username"});
  if (requested.length === 0) {
    res.status(200).json({
      msg: "No recipe with ID " + req.params.id
    })
  } else {
    try {
      res.status(200).json(
        requested
      )
    } catch(error) {
      res.status(500).json({
        msg: "Server failed",
        error: error
      })
    }
  }
}

// const LIT = new cocktailModel({
  // name: "Long Island Iced Tea",
  // method: "Shaken",
  // ingredients: [{ingredient: "vodka", quantity: 15, measure: "ml"},
  //               {ingredient: "rum", quantity: 15, measure: "ml"},
  //               {ingredient: "triple sec", quantity: 15, measure: "ml"},
  //               {ingredient: "gin", quantity: 15, measure: "ml"},
  //               {ingredient: "tequila", quantity: 15, measure: "ml"},
  //               {ingredient: "lemon juice", quantity: 30, measure: "ml"},
  //               {ingredient: "cola", quantity: 30, measure: "ml"},
  //               {ingredient: "lemon wedge", quantity: 1, measure: "item"}],
  // instructions: ["Step 1: Pour all liquors and lemon juice into cocktail shaker with ice.",
  //               "Step 2: Shake well.",
  //               "Step 3: Strain over fresh ice.",
  //               "Step 4: Top with cola and garnish with lemon wedge. Enjoy!"],
  // posted_by: "632db07afc2d1691bac270f6"
// })

const postNewRecipe = async(req, res) => {
  // const {name, method, ingredients, instructions} = req.body;
  try {
    const recipe = await recipeModel.create(req.body);
    res.status(200).json(recipe)
  } catch (error) { 
    res.status(500).json({ error: error.message })}
}

const deleteRecipe = async(req, res) => {
  res.json({mssg: "DELETE a recipe"})
}

const updateRecipe = async(req, res) => {
  res.json({mssg: "UPDATE a recipe"})
}

export { getAllRecipes, getByMethod, getByID, postNewRecipe, deleteRecipe, updateRecipe }