const { Server } = require("socket.io");

const initializeSocket = (server, FRONTEND_URL) => {


    // creating socket.io server and connecting both http and socket.io
  const io = new Server(server, {
    cors: {
      origin: FRONTEND_URL,
      methods: ["GET", "POST"],
    },
  });


  io.on("connection", (socket) => {

    // console.log("User connected:", socket.id);

    socket.on("user-message", (message) => {
      io.emit("message", message);
    });

    socket.on("disconnect", () => {
    //   console.log("User disconnected:", socket.id);
    });

  });

  return io;
};

module.exports = initializeSocket;
