import React,{useState,useEffect} from 'react'
import { io } from "socket.io-client";
const socket=io("http://localhost:3001");
const App = () => {
  const [message,setMesage]=useState("");
  const [messageRecieved, setMessageReceived] = useState("");
  const [joinRoom,setjoinRoom]=useState("");
  const sendMessage=()=>{
    socket.emit("send_message",{message,joinRoom})
  }
  const joinRoomHandler=()=>{
    if(joinRoom!==""){
      socket.emit("join_room",joinRoom)
    }
  }
  useEffect(() => {
    socket.on("receive_message",(data)=>{
      setMessageReceived(data.message);
    })
  }, [socket]);
  return (
    <div className='App'>
       <input 
     value={joinRoom}
     onChange={(event)=>{
       setjoinRoom(event.target.value)
     }}
     />
      <button onClick={joinRoomHandler}>Join Room</button>

     <input 
     value={message}
     onChange={(event)=>{
       setMesage(event.target.value)
     }}
     />
      <button onClick={sendMessage}>Send Message</button>
      <h1>{messageRecieved}</h1>
    </div>
  )
}

export default App