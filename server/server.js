import express from 'express';
import cors from 'cors';
import * as dotenv from "dotenv";
import mongoose from 'mongoose';
import recipesRouter from './routes/recipes.js';
import usersRouter from './routes/users.js';
import cloudinaryConfig from './config/cloudinaryConfig.js';
import passport from 'passport';
import passportConfig from './config/passportConfig.js';

dotenv.config();
const app = express();
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
  app.use(cors());
  cloudinaryConfig();
  app.use(passport.initialize());
  passportConfig();

  //track requests
  app.use((req, res, next) => {
    console.log(req.path, req.method)
    next();
  })
}

const loadRoutes = () => {
  app.use('/api/recipes', recipesRouter);
  app.use('/api/users', usersRouter);
}

(async function controller () {
  await mongoDBConnect();
  addMiddlewares();
  loadRoutes();
}) ();
