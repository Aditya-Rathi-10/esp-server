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
    res.json({ data: theftData })
})

app.post("/api/data", async (req, res) => {
    const { theft, inCurrent, outCurrent, poleId, poleNumber, address, area, latitude, longitude } = req.body;
    if (theft === 1) {
        try {
            await Theft.create({
                theft: true,
                inCurrent,
                outCurrent,
                poleId,
                poleNumber,
                address,
                area,
                latitude,
                longitude
            });
            const data = req.body
            console.log("data", data)
            res.json({ message: "data aa gaya" })
        } catch (error) {
            console.error("Theft add error", error);
            res.status(500).json({ error: "Error adding theft data" });
        }
    }
})

app.post("/update-status", async (req, res) => {
    try {
        const { poles } = req.body;

        if (!poles || !Array.isArray(poles)) {
            return res.status(400).json({ error: "Invalid data format." });
        }

        const updatePromises = poles.map(pole => {
            return Theft.findByIdAndUpdate(
                pole.id, 
                { status: pole.status }, 
                { new: true }
            );
        });

        await Promise.all(updatePromises);

        res.status(200).json({ message: "Statuses successfully updated!" });
    } catch (error) {
        console.error("Status Update Error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


app.delete("/data", async (req, res) => {
    await Theft.deleteMany({})
    res.json({ message: "delete hogaya" })
})

app.listen(PORT, () => console.log("Server started"))