import axios from "axios";
import { BACKEND_URL } from "../../../config";
import ChatBox from "../../../components/ChatBox";
interface ParamsInput {
    params: {
        slug: string;
    }
}

async function getRoom(slug: string) {
    const response = await axios.get(`${BACKEND_URL}/room/${slug}`);
    return response.data.room;

}


export default async function ChatRoom1( { params } : ParamsInput) {

    const slug = (await params).slug;
    const room = await getRoom(slug);
    const roomId = room.id; //This contains roomId 

    return <div className="flex h-screen w-screen items center justify-center bg-purple-600"> 
        <ChatBox id={roomId}></ChatBox>
        </div>





    //Use id and BE to fetch last 50 messages (db call)
    //Connect with ws
    //Send join_room req to ws //Can only send strings so stringified json will be sent of three type "join_room", "leave_roon", "chat"
    //From now on send only chat type in websocket
    //ws.close if leave_room comes

}