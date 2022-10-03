import express from 'express';
import cors from 'cors';
import * as dotenv from "dotenv";
import mongoose from 'mongoose';
import recipesRouter from './routes/recipes.js';
import usersRouter from './routes/users.js';
import { cloudinaryConfig } from './config/cloudinaryConfig.js';

dotenv.config();
const app = express();
app.use(cors());
const port = process.env.PORT || 5000;

const mongoDBConnect = () => {
  mongoose.connect(process.env.MONGO_URI)
    .then(() => {
      app.listen(port, () => {
        console.log('Connected to MongoDB & listening on port ' + port);
      });
    })
    .catch((error) => {console.log(error.message)}) 
}

const addMiddlewares = () => {
  app.use(express.json());
  app.use(
    express.urlencoded({
      extended: true,
    })
  );
  cloudinaryConfig();
  //track requests
  app.use((req, res, next) => {
    console.log(req.path, req.method)
    next();
  })
}

const loadRoutes = () => {
  app.use('/recipes', recipesRouter);
  app.use('/users', usersRouter);
}

(async function controller () {
  await mongoDBConnect();
  addMiddlewares();
  loadRoutes();
}) ();
