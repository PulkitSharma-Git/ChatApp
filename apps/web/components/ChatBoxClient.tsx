"use client"
import { Card } from "@repo/ui/Card";
import { useEffect, useState } from "react";
import { useSocket } from "../hooks/useSocket";
import { InputBox } from "@repo/ui/inputBox";
import { Button } from "@repo/ui/Button";

export function ChatBoxClient({  //Prop is an obj containing messages and id
    messages,
    id
}: {
    messages: {message: string}[]; //type of porp is and obj containing id which is a string  and messages which is a list of object in which each contains message which is string
    id: string;
}) {
    
    const [currentMessage, setCurrentMessage] = useState("");


    const [chats, setChats] = useState(messages);  //Contains previous 50 chats and upcoming chats will also be added
    const {socket, loading} = useSocket();

    useEffect( () => {
        if(socket && !loading) {  //after loading compeletes

            socket.send(JSON.stringify({
                type: "join_room",
                roomid: id
            }));

            socket.onmessage = (event) => { //When any message string comes
                const parsedData = JSON.parse(event.data);   //Convert string to json 

                if(parsedData.type === "chat") { 
                    setChats(c => [...c, {message: parsedData.message}]) //Add the chat bubble in messaages

                }
            }

        }
   

    }, [socket, loading, id])

    return <div>
        {chats.map(m => <div>{m.message}</div>)}
    
        <InputBox type="text" placeholder="Write your mesage" variant = "first" onChange={e => {
            setCurrentMessage(e.target.value)
        }}></InputBox>

        <Card text="Send" onClick={() => {
            socket?.send(JSON.stringify({
                type: "chat",
                roomId: id,
                message: currentMessage
            }))
            
            setCurrentMessage("");
        }}></Card>

        
        
        

    
        {/* <button className="bg-black" onClick={ () => {
            socket?.send(JSON.stringify({
                type: "chat",
                roomId: id,
                message: currentMessage
            }))
            
            setCurrentMessage("");
        }}>Send</button> */}
    </div>

}