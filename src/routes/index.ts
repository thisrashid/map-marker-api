import express from 'express';
import markerRouter from './marker.route';
import { MONGO_CONNECTED } from '../config';

const router = express.Router();

export const configureRoutes = (app: express.Application) => {

  router.get('/', (req, res) => {
    if(app.get(MONGO_CONNECTED)) {
      res.send('This is map-marker API');
    } else {
      res.send('Unable to connect to database. The app may not function properly');
    }
  })
  
  if(app.get(MONGO_CONNECTED)) {
    router.use('/markers', markerRouter);  
  }
  
  app.use('/', router);
}