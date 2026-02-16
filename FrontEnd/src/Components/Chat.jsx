import React, { useEffect, useRef, useState } from 'react'
import { useChatContext } from '../Contexts/ChatContext';
import { io } from "socket.io-client";

const socket = io(import.meta.env.VITE_BACKEND_URL);

const Chat = () => {


    const {messagesData,setMessageData,name,setName} = useChatContext();
    const [message , setMessage] = useState("");
    const buttonColorChangeRef = useRef();
    const bottomRef = useRef(null);





    const sendMessage = (message) => {
        if (!message.trim()) return;
       
        const newMessage = {
        id: Date.now(),
        who: name,
        messageFromUser: message,
      };

    // Add to local state (so sender sees immediately)
    setMessageData((prev) => [...prev, newMessage]);

    // Sedning the messas=ge to backend
    socket.emit("user-message", newMessage);
        setMessage("");
    }



  useEffect(() => {
    socket.on("message", (data) => {
      // Avoid showing same message twice in sender tab
      setMessageData((prev) => {
        // skip duplicates if already exists (same id)
        if (prev.some((msg) => msg.id === data.id)) return prev;
        return [...prev, data];
      });
    });

    return () => socket.off("message");
  }, [setMessageData]);






    useEffect(() => {
         if (buttonColorChangeRef.current) {
             if (message.trim() !== "") {
                  buttonColorChangeRef.current.style.backgroundColor = "rgba(8, 245, 8, 0.705)";
            } else {
                buttonColorChangeRef.current.style.backgroundColor = "";
            }
         }
    },[message])




    
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messagesData]);



  return (
    <>
    <div className='container'>
      <h1>Chat With @Everyone Who Are In This Platform</h1>
            <div className='all-messages'>
                { messagesData.length > 0 && messagesData.map((singleMessage)  => (
                     <div key={singleMessage.id} className='single-chat'>
                       <p>{singleMessage.who}:{singleMessage.messageFromUser}</p>
                    </div>
                ))}
                <div ref={bottomRef}>{""}</div>
            </div>

            <div className='message-sending-div'>
              <input type="text" placeholder='Message' value={message} onChange={(e) => setMessage(e.target.value)}/>
              <button ref={buttonColorChangeRef} onClick={() => sendMessage(message)}>Send</button>
            </div>
    </div>
    </>
  )
}

export default Chat
