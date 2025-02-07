"use client"
import { InputBox } from "@repo/ui/inputBox" //Card is actually a button
import { Button } from "@repo/ui/Button" //Button is actually a card
import { Card } from "@repo/ui/Card";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";



export default function Page() {
  const router = useRouter();
  const [roomName, setRoomName] = useState("");
 
  return (
   <div className="flex items-center justify-center h-screen w-screen">
    <Button>

    <InputBox type="text" variant="first" placeholder="Room Name" onChange={ (e) => {
      setRoomName(e.target.value)
    }}></InputBox>

    <Card onClick={ async ()=> {
        const token = localStorage.getItem("token");

        const response = await axios.post("http://localhost:3001/joinroom", {
            name: roomName
        }, {
            headers: {
                Authorization: token
            }
        })

        const roomId = response.data.roomId;

        router.push(`/ChatRoom/${roomName}`)
        

   

    }} text="Join Room"></Card>
    </Button>
   </div>
  );
}
