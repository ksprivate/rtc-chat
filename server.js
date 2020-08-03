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
  res.redirect("/" + id);
});

app.get("/:id", (req, res) => {
    
    rooms.forEach(o=>{
        if(o.roomid===req.params.id){
      
            res.render("message", {
                id: o.roomid,
                users:o.users 
              });
        }
        else{
            res.status(404)
            res.send('room not found')
            res.end()
        }
    })
  
});
io.on("connection", (socket) => {
  socket.on("message", (id, data) => {
    socket.join(id)
    socket.to(id).broadcast.emit("message", data);
  });
  socket.on("user-connected", (id, data) => {
    socket.join(id)
   rooms.forEach((o) => {
       if(o.roomid===id){
       o.users.push(data)
   }})
    socket.to(id).broadcast.emit("user-connected", data);
  });
  socket.on("user-disconnected", (id, data) => {
    socket.join(id)

    socket.to(id).broadcast.emit("user-disconnected", data);
  });
});

/*io.on('connection',socket=>{
    socket.on('message2',(id,data)=>{
        console.log(data)
        console.log(id)
    })
})*/
server.listen(process.env.PORT || 3000);
