import mongoose from "mongoose";
import app from "./app";

const PORT = process.env.PORT || 3000;

const start = async () => {
    if (!process.env.JWT_KEY) {
        throw new Error('JWT_TOKEN is not defined');
    }

    if (!process.env.MONGO_URI) {
        throw new Error('MONGO_URI is not defined');
    }

    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('connected to MONGO D:');
    } catch (error) {
        console.error(error);
    }

    app.listen(PORT, () => {
        console.log(`Auth running on port ${PORT} :D`);
    });
}

start();
