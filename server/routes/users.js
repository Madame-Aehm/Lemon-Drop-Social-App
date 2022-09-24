import express from "express";
import { getAllUsers } from "../controllers/usersController.js";

const router = express.Router()

router.get("/test", (req, res) => {
  res.send({message: "testing message recieved"})
})

router.get("/all", getAllUsers);
export default router