import express from "express";
import { getAllUsers, newUser, getUserByID, uploadImage, deleteUser, updateUser } from "../controllers/usersController.js";
import { multerUploads } from '../middlewares/multer.js';

const router = express.Router()

router.get("/test", (req, res) => {
  res.send({message: "testing message recieved"})
})

router.get("/all", getAllUsers);
router.get("/:id", getUserByID);

router.post('/upload-image', multerUploads.single("image"), uploadImage);
router.post('/', newUser);

router.patch('/:id', updateUser);

router.delete('/:id', deleteUser);

export default router