import mongoose from "mongoose"
import "dotenv"

export default function connectDB() {
    const mongo_url = process.env.MONGO_URI || "mongodb://localhost:27017/test"
        try {
        mongoose.connect(mongo_url)
        console.log("Connection to database succesfull.")
    } catch {
        console.log("Error connecting to database.")
    }
}