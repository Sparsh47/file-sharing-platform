import * as mongoose from "mongoose";

const FileSchema = new mongoose.Schema({
    filename: String,
    mimetype: String,
    data: Buffer,
    uploadedAt: {
        type: Date,
        default: Date.now,
    }
})

export const FileModel = mongoose.model("File", FileSchema);
