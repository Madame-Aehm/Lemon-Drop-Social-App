import mongoose from 'mongoose';

const { Schema } = mongoose;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  favourite_drink: {
    type: String,
    required: true,
  },
  profile_picture: {
    type: String
  },
  posted_recipes: [{ type: Schema.Types.ObjectId, ref: "cocktail" }]
}, { timestamps: true })

const userModel = mongoose.model("user", userSchema);
export { userModel }