// import dotenv from 'dotenv';
// dotenv.config()
// import connectDB from './config/db';
// import http from 'http';
// import express from 'express';
// import {Server} from 'socket.io'
// import path from 'path';
// import { fileURLToPath } from 'url';

// const dotenv = require("dotenv");
// dotenv.config();
// const connectDB = require("./config/db");
// const http = require('http');
// const express = require('express');
// const {Server} = require("socket.io");
// const path = require("path");
// const {fileURLToPath} = require("url");


// connectDB();


// const __dirname = path.resolve();

// const PORT = process.env.PORT || 2000;
// const FRONTEND_URL = process.env.FRONTEND_URL;



// const app = express();
// const server = http.createServer(app);



// const io = new Server(server, {
//   cors: {
//     origin: [FRONTEND_URL], // ur react server link
//     methods: ["GET", "POST"],
//   },
// });

// app.use(express.static(path.join(__dirname,"../FrontEnd/dist")))


// io.on("connection", (socket) => {
//   console.log("User connected:", socket.id);

//   socket.on("user-message", (message) => {
//     console.log("Received:", message);


//     io.emit("message", message);
//   });

//   socket.on("disconnect", () => {
//     console.log("User disconnected:", socket.id);
//   });
// });





// app.use(express.static('../FrontEnd'))

// app.get("/",(req,res) => {
//     return res.sendFile(path.join(__dirname,"../FrontEnd/dist","index.html"))
// })



// server.listen(5000,() => {
//     console.log("server listening at 5000")
// })

const dotenv = require("dotenv");
dotenv.config();

const connectDB = require("./config/db");
const http = require("http");
const express = require("express");
const { Server } = require("socket.io");
const path = require("path");

connectDB();

const PORT = process.env.PORT || 5000;
const FRONTEND_URL = process.env.FRONTEND_URL;

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: FRONTEND_URL,
    methods: ["GET", "POST"],
  },
});

app.use(express.static(path.join(__dirname, "../FrontEnd/dist")));

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("user-message", (message) => {
    console.log("Received:", message);
    io.emit("message", message);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../FrontEnd/dist", "index.html"));
});

server.listen(PORT, () => {
  console.log(`Server listening at ${PORT}`);
});
