import express from "express";
import FileController from "../controller/fileController.controller";
import {upload} from "../middleware/upload.middleware";

export const router = express.Router();

const fileController = new FileController();

router.post("/upload", upload.array("files"), fileController.uploadFiles)
router.get("/download/:fileId", async (req, res) => {})