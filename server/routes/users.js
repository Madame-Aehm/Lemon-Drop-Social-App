import express from "express";
import { getAllUsers, newUser, getUserByID, uploadImage, deleteUser, updateUser, deleteImage, login } from "../controllers/usersController.js";
import { multerUploads } from '../middlewares/multer.js';

const router = express.Router()

router.get("/test", (req, res) => {
  res.send({message: "testing message recieved"})
})

router.get("/all", getAllUsers);
router.get("/:id", getUserByID);

router.post('/upload-image', multerUploads.single("image"), uploadImage);
router.post('/delete-image', deleteImage);
router.post('/sign-up', newUser);
router.post('/login', login);

router.patch('/:id', updateUser);

router.delete('/:id', deleteUser);

export default router