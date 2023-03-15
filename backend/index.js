const express = require("express");
const cors = require("cors");

const meds = require("./meds");

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.send("ARIES STAN NO1")
});

app.get("/meds", (req, res) => {
    res.send(meds)
});

const PORT = process.env.PORT || 10000;

app.listen(PORT, console.log("ARIES STAN NO1"))