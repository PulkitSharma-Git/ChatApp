import { WebSocketServer, WebSocket } from 'ws';
import jwt from "jsonwebtoken";
import { client } from '@repo/db/client';

const wss = new WebSocketServer({ port: 8080 });

interface User {
    userId: string;
    rooms: string[],
    ws: WebSocket
}

interface Data {
    type: string,
    roomId: string,
    message: string
}

const users: User[] = [];

function checkUser(token: string) {
    const decoded = jwt.verify(token, "jwtSecret");

    if(typeof decoded == "string") {
        return null;
    }
    return decoded.userId;
}

wss.on('connection', function connection(ws: WebSocket, request) {
    //Example url `ws://localhost:8080?token=${token}`
    const url = request.url;
    const queryParams = new URLSearchParams(url?.split("?")[1]);
    const token = queryParams.get("token");

    if(!token) { 
        console.log("Recieved invalid token");
        ws.close();
        return;
    }

    const userId = checkUser(token);

    if(!userId) {
        ws.close();
        return;
    }

    users.push({ userId, rooms: [], ws });  //Sent the user into the users array with joined_rooms being zero

    ws.on("message", async function message(data: string) { //You can only send strings in a WebSocket message
        const parsedData: Data = JSON.parse(data); //Converted "{}" to {}

        if(parsedData.type === "join_room") {
            const user = users.find( x => x.ws === ws); //Search for the user with the provided ws in users
            user?.rooms.push(parsedData.roomId); //Push the room into the rooms[] of the user
        }

        if(parsedData.type === "leave_room") {
            const user = users.find( x => x.ws === ws); //Search for use with the passed websocket
            if(!user) return;
            user.rooms = user?.rooms.filter( x => x !== parsedData.roomId);
        }

        if(parsedData.type === "chat") {
            const roomId = parsedData.roomId;
            const message = parsedData.message;

            //DB call to throw the chat in chat table
            
            const messagetoAll = {  //Data to broadcast to other ws connections (Ofcourse which have the same roomId)
                type: "chat",
                message: message,
                roomId
            }
            users.forEach( user => {
                if(user.rooms.includes(roomId)) {
                    user.ws.send(JSON.stringify( messagetoAll ));
                }
            });
            await client.chat.create({
                data: {
                    roomId: Number(roomId),
                    message,
                    userId
                    
                }
            })
        }
    });
});