import { BACKEND_URL } from "../config";
import axios from "axios";
import { ChatBoxClient } from "./ChatBoxClient";


async function getChats(roomId: string) {
    const response = await axios.get(`${BACKEND_URL}/chats/${roomId}`);
    return response.data.chats;
}

export default async function ChatBox({id} : {
    id: string
}) {
    const messages = await getChats(id);
    return (

        <ChatBoxClient id={id} messages={messages}></ChatBoxClient>
    )

}