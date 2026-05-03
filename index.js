import express from "express"

const app = express()
const PORT = 3000

app.use(express.json())

app.get("/", (req, res) => {
    return res.json({ message: "hello" })
})

app.post("/api/data", (req, res) => {
    const data = req.body
    console.log("data", data)
    return res.json({ message: "data aa gaya" })
})

app.listen(PORT, () => console.log("Server started"))