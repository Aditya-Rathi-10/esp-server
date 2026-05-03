import express from "express"
import mongoose from "mongoose"
import { connectToDb } from "./dbConnect.js"
import { Theft } from "./schema.js"
import dotenv from "dotenv"
import cors from "cors"

dotenv.config({
    path: "./.env"
})

const app = express()
const PORT = 3000

app.use(cors({
    origin: "*"
}))
app.use(express.json())

connectToDb()

app.get("/", (req, res) => {
    return res.json({ message: "hello" })
})

app.get("/theft-data", async (req, res) => {
    const theftData = await Theft.find({})
    return res.json({ data: theftData })
})

app.post("/api/data", async (req, res) => {
    const { theft, input, output, poleId, poleNumber, latitude, longitude } = req.body;
    if (theft === 1) {
        await Theft.create({
            theft: true,
            input,
            output,
            poleId,
            poleNumber,
            latitude,
            longitude
        });
        const data = req.body
        console.log("data", data)
        return res.json({ message: "data aa gaya" })
    }
})

app.listen(PORT, () => console.log("Server started"))