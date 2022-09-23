import { userModel } from "../models/usersModel.js";

const getAllUsers = async (req, res) => {
  const allUsers = await userModel
    .find({})
    .populate({ path: "posted_recipes", select: ["name", "method"] });
  try {
    if (allUsers.length === 0) {
      req.status(200).json({
        msg: "No users found"
      })
    } else {
      res.status(200).json(
        allUsers
      )
    }
  } catch (error) {
    res.status(500).json({
      msg: "Server failed",
      error: error
    });
  }
};

export { getAllUsers }