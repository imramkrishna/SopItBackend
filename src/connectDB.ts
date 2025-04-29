import mongoose from "mongoose"
import dotenv from "dotenv"

dotenv.config()

export default async function connectDB() {
    const mongo_url = process.env.MONGO_URL
    
    if (!mongo_url) {
        console.error("MONGO_URL environment variable is not defined")
        throw new Error("Database connection URL missing - check your .env file")
        return // Not needed after throw, but added for clarity
    }
    
    try {
        await mongoose.connect(mongo_url)
        console.log("Connection to database successful.")
    } catch (error) {
        console.error("Error connecting to database:", error)
    }
}