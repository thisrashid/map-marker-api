import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { configureRoutes } from './routes';
import connectToDb from './db';
import { Server, createServer } from 'http';

const PORT = process.env.PORT || 8080;
const DATABASE = process.env.DATABASE || 'mongodb://192.168.99.100:27017/map_markers';

const app: express.Application = express();
const server: Server = createServer(app);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

function listen() {
  configureRoutes(app);

  server.listen(PORT, () => {
    console.log(`Map-Marker-API app listening on port ${PORT}!`);
  });
}

connectToDb(DATABASE, app, listen);

export { app, server };