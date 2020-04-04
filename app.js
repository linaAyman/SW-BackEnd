  const express = require("express");
  const app = express();
  const morgan = require("morgan");
  const bodyParser = require("body-parser");
  const mongoose = require("mongoose");
  const winston=require("winston");
  const userRoutes = require('./routes/user');
  const playlistRoutes = require('./routes/playlist');
  const searchRoutes=require('./routes/search');
  const artistRoutes = require('./routes/artist');
  const albumRoutes = require('./routes/album');
  
  /*mongoose.connect(`mongodb://3.137.69.49:27017/MaestroApp`, { useNewUrlParser: true ,useUnifiedTopology: true ,useCreateIndex: true  }).
  catch(error => handleError(error));
  mongoose.set('useFindAndModify', false);

  mongoose.Promise = global.Promise;*/
let db="mongodb+srv://maestroApplication:BACk1ENd1@cluster0-zwzxg.mongodb.net/MaestroApp?retryWrites=true&w=majority"
  mongoose
    .connect(db, {
      useCreateIndex: true,
      useNewUrlParser: true
    })
    .then(() => winston.info(`Connected to MongoDB...`))
  
  app.use(morgan("dev"));
  app.use('/uploads', express.static('uploads'));
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  
  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === "OPTIONS") {
      res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
      return res.status(200).json({});
    }
    next();
  });
  
  // Routes which should handle requests

  app.use("", userRoutes);
  //app.use("/users/:id",userRoutes);
  app.use("/playlist", playlistRoutes);
  app.use("/playlists/:id", playlistRoutes);
  app.use("/search",searchRoutes);
  app.use('/artist/:id', artistRoutes);
  app.use('/albums/:id', albumRoutes);
  
  app.use((req, res, next) => {
    const error = new Error("Your request isnt supported yet");
    error.status = 404;
    next(error);
  });
  
  app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
      error: {
        message: error.message
      }
    });
  });
  
  module.exports = app;
