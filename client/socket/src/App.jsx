import React,{useState,useEffect} from 'react'
import { io } from "socket.io-client";
const socket=io("http://localhost:3001");
import ScrollToBottom from "react-scroll-to-bottom";
const App = () => {
  const [message,setMesage]=useState("");
  const [messageRecieved, setMessageReceived] = useState("");
  const [joinRoom,setjoinRoom]=useState("");
  const [messageList, setMessageList] = useState([]);
  const sendMessage=()=>{
    socket.emit("send_message",{message,joinRoom})
    setMessageList((list) => [...list, message]);
  }
  const joinRoomHandler=()=>{
    if(joinRoom!==""){
      socket.emit("join_room",joinRoom)
    }
  }
  useEffect(() => {
    socket.on("receive_message",(data)=>{
      // setMessageReceived(data.message);
      console.log("bro")
      setMessageList((list) => [...list, data.message]);
    })
  }, [socket]);
  console.log("messageList",messageList);
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
      {/* <h1>{messageRecieved}</h1> */}
      <div className="message-container">
          {messageList.map((messageContent,i) => {
            return (
               <div key={i}>
                 {messageContent}
              </div>
            );
          })}
        </div>
    </div>
  )
}

export default App