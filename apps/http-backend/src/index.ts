import express, { json } from "express";

const app = express();
app.use(express.json());

app.post("/signup", (req, res) => {

})

const PORT = 3001;

app.listen(PORT, () => {
    console.log("HTTP BE listening on 3001")
})