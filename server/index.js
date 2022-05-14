const express=require('express');
const app=express();
const http=require("http");
const {Server}=require("socket.io");
const server=http.createServer(app);
const cors=require("cors");
app.use(cors());
const io=new Server(server,{
    cors:{
        origin:"http://localhost:3000",
        methods:["GET","POST"]
    }
})
io.on("connection",(socket)=>{
   console.log(`User Connected:${socket.id}`);
//    socket.on("send_message",(data)=>{
//        socket.broadcast.emit("receive_message",data)
//    })
socket.on("join_room",(data)=>{
    socket.join(data);
});
socket.on("send_message",(data)=>{
    socket.to(data.joinRoom).emit("receive_message",data);
})
})
server.listen(3001,()=>{
    console.log("server is running")
})