import express from "express";
import cors from "cors";
import connectToDB from "./config/db";
import {router as fileRouter} from "./routes/fileRoutes.router"

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectToDB();

app.use("/api/v1/file", fileRouter);

app.listen(8080, ()=>{
    console.log("Server is running on port 8080");
})