import mongoose from 'mongoose';

const { Schema } = mongoose;

const cocktailSchema = new Schema({
  _id: Schema.Types.ObjectId,
  name: {
    type: String,
    required: true,
    unique: true,
  },
  method: {
    type: String,
    required: true,
  },
  ingredients: [{"ingredient": String, "quantity": Number, "measure": String}],
  instructions: [String],
  posted_by: { type: Schema.Types.ObjectId, ref: "user" }
})

const cocktailModel = mongoose.model("cocktail", cocktailSchema);
export { cocktailModel }