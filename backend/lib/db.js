// step15: now lets create a function to connect to the database here below.

// step16: see the next steps now in server.js file now there.
import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB connected : ${conn.connection.host}`);
    } catch (error) {
        console.log("Error connecting to MongoDB : " , error.message);
        process.exit(1); // status code 1 exit means failure and status code 0 exit means success
    }
}