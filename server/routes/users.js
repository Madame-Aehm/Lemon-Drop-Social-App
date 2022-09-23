import express from "express";
import { getAllUsers } from "../controllers/usersController.js";

const usersRouter = express.Router()

usersRouter.get("/test", (req, res) => {
  res.send({message: "testing message recieved"})
})

usersRouter.get("/all", getAllUsers);
export default usersRouter