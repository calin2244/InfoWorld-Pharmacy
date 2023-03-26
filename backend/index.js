const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const register = require("./routes/register");
const login = require("./routes/login");


const meds = require("./meds");

const app = express();

require("dotenv").config();

app.use(express.json());
app.use(cors());

app.use("/api/register", register);
app.use("/api/login", login);

app.get("/", (req, res) => {
    res.send("ARIES STAN NO1")
});

app.get("/meds", (req, res) => {
    res.send(meds)
});

const PORT = process.env.PORT || 10000;
const URI = process.env.MONGO_URI;

app.listen(PORT, console.log("ARIES STAN NO1"))

mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("Ne-am conectat la mongo :o"))
.catch((err) => console.log("Mda.... \n", err));