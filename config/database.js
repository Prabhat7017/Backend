const mongoose = require("mongoose");
require("dotenv").config();

exports.connect = () => {
    mongoose.connect(process.env.MONGODB_URL).then(console.log("DB connection successful")).catch((err) => {
        console.log("Db connection failed");
        console.error(err);
        process.exit(1);
    })
}