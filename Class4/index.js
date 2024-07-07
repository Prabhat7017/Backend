const express = require("express");
const app = express();
const blog = require("./routes/blog");
require("dotenv").config();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/api/v1", blog);

const connectDB = require("./config/database");
connectDB();

app.listen(PORT, () => {
    console.log(`Server started at ${PORT}`);
});

app.get("/", (req, res)=>{
    res.send(`<h1>Home Page </h1>`);
})
