const express = require("express");
const app = express();
const http = require("http").createServer(app);
const mongoose = require("mongoose");
const socketio = require("socket.io");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const PORT = process.env.PORT || 5000;

const { addUser, getUser, removeUser } = require("./util");
const Message = require("./models/Message");
const Room = require("./models/Room");
const authRoutes = require("./routes/authRoutes");

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

//TODO ROUTES
app.use(authRoutes);

//TODO SOCKETIO
const io = socketio(http, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
    methods: ["GET", "POST"],
  },
});

//TODO DATABASE
const mongoDB = "mongodb://localhost:27017/dbchatprueba";

mongoose
  .connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("connected database"))
  .catch((err) => console.log(err));

//TODO SOCKETIO
io.on("connection", (socket) => {
  console.log(socket.id);
  Room.find().then((result) => {
    socket.emit("output-rooms", result);
  });
  socket.on("create-room", (name) => {
    const room = new Room({ name });
    room.save().then((result) => {
      io.emit("room-created", result);
    });
  });
  socket.on("join", ({ name, room_id, user_id }) => {
    const { error, user } = addUser({
      socket_id: socket.id,
      name,
      room_id,
      user_id,
    });
    socket.join(room_id);
    if (error) {
      console.log("join error", error);
    } else {
      console.log("join user", user);
    }
  });
  socket.on("sendMessage", (message, room_id, callback) => {
    const user = getUser(socket.id);
    const msgToStore = {
      name: user.name,
      user_id: user.user_id,
      room_id,
      text: message,
    };
    console.log("message", msgToStore);
    const msg = new Message(msgToStore);
    msg.save().then((result) => {
      io.to(room_id).emit("message", result);
      callback();
    });
  });

  socket.on("get-messages-history", (room_id) => {
    Message.find({ room_id }).then((result) => {
      socket.emit("output-messages", result);
    });
  });
  socket.on("disconnect", () => {
    const user = removeUser(socket.id);
  });
});

//TODO SERVER
http.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
