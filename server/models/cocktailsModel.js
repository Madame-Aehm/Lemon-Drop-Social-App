import mongoose from 'mongoose';

const { Schema } = mongoose;

const cocktailSchema = new Schema({
  Name: {
    type: String,
    required: true,
    unique: true,
  },
  Method: {
    type: String,
    required: true,
  },
  Ingredients: [{"ingredient": String, "quantity": Number, "measure": String}],
  Instructions: [String]
})

const cocktailModel = mongoose.model("cocktail", cocktailSchema);
export { cocktailModel }