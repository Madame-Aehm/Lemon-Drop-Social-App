import mongoose from 'mongoose';

const { Schema } = mongoose;

const commentSchema = new Schema({
  posted_by: { type: Schema.Types.ObjectId, ref: "user", required: true },
  comment: { type: String, required: true },
}, { timestamps: true });

const recipeSchema = new Schema({
  name: { type: String, required: true },
  method: { type: String, required: true },
  image: { type: Object, required: true },
  ingredients: [{ 
    ingredient: { type: String, required: true }, 
    quantity: { type: Number, required: true },
    measure: { type: String, required: true }
  }],
  instructions: [{ type: String, required: true }],
  posted_by: { type: Schema.Types.ObjectId, ref: "user", required: true },
  favourited_by: [{ type: Schema.Types.ObjectId }],
  comments: [commentSchema]
}, { timestamps: true });

const recipeModel = mongoose.model("cocktail", recipeSchema);
export { recipeModel }