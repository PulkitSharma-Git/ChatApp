import express, { json } from "express";
import { client } from "@repo/db/client";
import jwt from "jsonwebtoken";


const app = express();
app.use(express.json());



interface UserCreateInput {
    email: string;
    password: string;
    name: string;
}

interface UserWhereInput {
    email: string,
    password: string
}

app.post("/signup", async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const name = req.body.name;

    const newUser: UserCreateInput = {
        email: username,
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

    const token = jwt.sign(user , "jwtSecret"); //JWT_SECRET is hard coded make it a import which is not pushed

    res.json({
        token
    })
})


const PORT = 3001;

app.listen(PORT, () => {
    console.log("HTTP BE listening on 3001")
})