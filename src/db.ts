import mongoose from "mongoose";
import { MONGO_CONNECTED } from "./config";
import express from "express";

export default (db_url: string, app: express.Application, callback: () => void) => {
  mongoose.connection
    .on('error', err => {
      console.error(err);
      app.set(MONGO_CONNECTED, false);
    })
    .on('disconnected', () => {
      console.log(`MongoDB disconnected. Retry after 5 secs...`);
      setTimeout(callback, 5000);
    })
    .once('open', () => {
      app.set(MONGO_CONNECTED, true);
      callback();
    });
  return mongoose.connect(db_url, { useNewUrlParser: true });
}