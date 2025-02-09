import express, { json } from "express";
import { client } from "@repo/db/client";
import jwt from "jsonwebtoken";
import cors from "cors";
import { authMiddleware } from "./middlewares/authMiddleware";

const app = express();
app.use(cors());
app.use(express.json());

interface UserCreateInput {
    email: string;
    password: string;
    name: string;
}

interface UserWhereInput {
    email: string;
    password: string;
}

interface RoomCreateInput {
    slug: string;
    adminId: string;
}

app.post("/signup", async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;

    const newUser: UserCreateInput = {
        email: email,
        password,
        name
    }

    await client.user.create({
        data: newUser
    })

    res.json({
        message: "Signed up successuflly"
    })


})

app.post("/signin", async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const searchUser: UserWhereInput = {
        email: username,
        password
    }

    const user = await client.user.findFirst({
        where: searchUser
    })

    if(!user) {
        res.json({
            message: "User not found. Please Sign In !"
        })
        return;
    }

    const userId = user.id;
    const token = jwt.sign({userId}, "jwtSecret"); //JWT_SECRET is hard coded make it a import which is not pushed

    res.json({
        token
    })
})

app.post("/joinroom", authMiddleware, async (req, res) => {
    const roomName = req.body.name;
    const adminId = req.userId;

    if(!adminId){
        console.log("Could not get adminId")
        return;
    }

    const createRoom : RoomCreateInput = {
        slug: roomName,
        adminId: adminId
    }

    const room = await client.room.create({
        data: createRoom
    })

    res.json({
        roomId: room.id
    })

})

// EndPoint to get roomId from the slug (Get id of room from the name (slug) of the room)
app.get("/room/:slug", async (req, res) => {
    const slug = req.params.slug;

    const room = await client.room.findFirst({
        where: {
            slug
        }
    });

    res.json({
        room
    })
})

//EndPoint to get Previous 50 chats of a room using roomId
app.get("/chats/:roomId", async (req, res) => {
    const roomId = Number(req.params.roomId);

    const chats = await client.chat.findMany({
        where: {
            roomId
        },
        orderBy: { 
            id: "desc"
        },
        take: 50
    });  

    res.json({ //JSON containing List of JSON objects (Each obj inside list is a chat)
        chats
    })


})

const PORT = 3001;
app.listen(PORT, () => {
    console.log("HTTP BE listening on 3001")
})