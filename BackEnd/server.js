const dotenv = require("dotenv");
dotenv.config();

const connectDB = require("./config/db");
const http = require("http");
const express = require("express");
const { Server } = require("socket.io");
const path = require("path");
const initializeSocket = require("./sockets/socketHandler");



//DB CONNECTION
connectDB();




//Injecting from .env
const PORT = process.env.PORT || 5000;
const FRONTEND_URL = process.env.FRONTEND_URL;



// creating the express server
const app = express();



// creating the http server
const server = http.createServer(app);



// Initialize socket
initializeSocket(server, FRONTEND_URL);



app.get("/", (req, res) => {
  res.send("Hello");
});


server.listen(PORT, () => {
  console.log(`Server listening at ${PORT}`);
});
