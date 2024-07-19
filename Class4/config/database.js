const mongoose= require("mongoose");
require("dotenv").config();
const connectDB= ()=>{
    mongoose.connect(process.env.DATABASE_URL).then(console.log("DB connected successfully !")).catch((err)=>{
        console.log(err);
        process.exit(1);
})
}

module.exports= connectDB;