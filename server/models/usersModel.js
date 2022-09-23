import mongoose from 'mongoose';

const { Schema } = mongoose;

const userSchema = new Schema({
  _id: Schema.Types.ObjectId,
  username: {
    type: String,
    required: true,
    unique: true,
  },
  favourite_drink: {
    type: String,
    required: true,
  },
  posted_recipes: [{ type: Schema.Types.ObjectId, ref: "cocktail" }]
})

const userModel = mongoose.model("user", userSchema);
export { userModel }