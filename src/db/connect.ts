import dotenv from 'dotenv'
import mongoose from "mongoose";

dotenv.config({ path: ".env" });


const mongoURI = process.env.MONGOURI

async function connectDb() {
    await mongoose.connect(mongoURI)
}

export default connectDb