import express, { json } from "express";
import { client } from "@repo/db/client"

const app = express();
app.use(express.json());


app.post("/signup", (req, res) => {

})

app.post("/signup", (req, res) => {

})


const PORT = 3001;

app.listen(PORT, () => {
    console.log("HTTP BE listening on 3001")
})