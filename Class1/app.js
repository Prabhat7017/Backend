const express = require("express")
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());

const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017//MyDatabase")
    .then(() => console.log("connected to db..."))
    .catch((err) => { console.log("error occured", err) });
app.listen(2000, () => {
    console.log("Serve listening on port 2000...");
})

app.get("/", (req, res) => {
    res.send("Server started");
})

app.post("/api/cars", (req, res) => {
    const { name, brand, city } = req.body;
    res.send("Working postman and request recieved...");
    console.log(name);
    console.log(brand, city);
})