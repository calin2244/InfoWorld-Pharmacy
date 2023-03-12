const express = require("express")
const cors = require("cors")

const app = express()

app.use(express.json())
app.use(cors())

app.get("/", (req, res) => {
    res.send("ARIES STAN NO1")
})

app.listen(59134, console.log("ARIES STAN NO1"))