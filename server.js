require("dotenv").config();
const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);
const { nanoid } = require("nanoid");
const mongo = require("mongodb");
const message = require("./models/message");
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
const rooms = [];
app.get("/", (req, res) => {
  res.render("home");
});
app.post("/createnewroom", (req, res) => {
  let id = nanoid();

  let room = { roomid: id, users: [] };
  rooms.push(room);
  console.log(rooms);
  res.redirect("/" + id);
});

app.get("/:id", (req, res) => {
  if(rooms){
 rooms.forEach((o) => {
    if (o.roomid == req.params.id) {
      res.render("message", {
        id: o.roomid,
        
      });
    }
  });
  }else{
res.status(404);
  res.send("room not found");
  res.end();
  }
 
  
});
io.on("connection", (socket) => {
  socket.on("message", (id, data) => {
    socket.join(id);
    socket.to(id).broadcast.emit("message", data);
  });
  socket.on("user-connected", (id, data) => {
    socket.join(id);
    rooms.forEach((o) => {
      if (o.roomid === id) {
        o.users.push(data);
      }
    });
    socket.to(id).broadcast.emit("user-connected", data);
  });
  socket.on("user-disconnected", (id, data) => {
    socket.join(id);
    for (let i = 0; i < rooms.length; i++) {
      if (rooms[i].roomid === id) {
        for (let j = 0; j < rooms[i].users.length; j++) {
          if (rooms[i].users[j] === data) {
            rooms[i].users.splice(j, 1);
          }
        }
      }
    }

    socket.to(id).broadcast.emit("user-disconnected", data);
  });
});


server.listen(process.env.PORT || 3000);
