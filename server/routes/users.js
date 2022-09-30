import express from "express";
import { getAllUsers, newUser, getUserByID, uploadDI, deleteUser, updateUser } from "../controllers/usersController.js";

const router = express.Router()

router.get("/test", (req, res) => {
  res.send({message: "testing message recieved"})
})

router.get("/all", getAllUsers);
router.get("/:id", getUserByID);

router.post('/uploadDI', uploadDI);
router.post('/', newUser);

router.patch('/:id', updateUser);

router.delete('/:id', deleteUser);

export default router