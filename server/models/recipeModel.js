import mongoose from 'mongoose';

const { Schema } = mongoose;

const recipeSchema = new Schema({
  name: {
    type: String, required: true, unique: true,
  },
  method: {
    type: String, required: true,
  },
  ingredients: [{ 
    ingredient: { type: String, required: true }, 
    quantity: { type: Number, required: true },
    measure: { type: String, required: true }
  }],
  instructions: [{ type: String, required: true }],
  posted_by: { type: Schema.Types.ObjectId, ref: "user", required: true }
})

const recipeModel = mongoose.model("cocktail", recipeSchema);
export { recipeModel }