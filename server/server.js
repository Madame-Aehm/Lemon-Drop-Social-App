import express from 'express';
import cors from 'cors';
import cocktailsRouter from './routes/cocktails.js';
import * as dotenv from "dotenv";
import mongoose from 'mongoose';

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

const mongoDBConnect = () => {
  mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Connection to Mongo DB established'))
    .catch(err => console.log(err));
}

const addMiddlewares = () => {
  app.use(express.json());
  app.use(
    express.urlencoded({
      extended: true,
    })
  );
}

const loadRoutes = () => {
  app.use('/api', cocktailsRouter);
}

const startServer = () => {
  app.listen(port, () => {
    console.log('Server is running on port ' + port);
  });
}

app.use(cors());

(async function controller () {
  await mongoDBConnect();
  addMiddlewares();
  loadRoutes();
  startServer();
}) ();
