import mongoose from "mongoose";

export default async function connectToDB() {
    await mongoose.connect("mongodb://localhost:27017/fileuploads");
    console.log("MongoDB Connected");
}