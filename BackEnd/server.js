const dotenv = require("dotenv");
dotenv.config();

const connectDB = require("./config/db");
const http = require("http");
const express = require("express");
const cors = require('cors')
const initializeSocket = require("./sockets/socketHandler");


//Injecting from .env
const PORT = process.env.PORT || 5000;
const FRONTEND_URL = process.env.FRONTEND_URL;


// creating the express server
const app = express();

app.use(express.json());
app.use(cors());

//DB CONNECTION
connectDB();


//routes
const auth = require("./routers/authRoutes");


// creating the http server
const server = http.createServer(app);



// Initialize socket
initializeSocket(server, FRONTEND_URL);


// home route
app.get("/", (req, res) => {
  res.send("Hello");
});


// auth api route
app.use("/api/auth",auth);





server.listen(PORT, () => {
  console.log(`Server listening at ${PORT}`);
  console.log(`http://localhost:${PORT}/`)
});
