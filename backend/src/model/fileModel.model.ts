import {FileModel} from "../schema/fileSchema.schema";

export default class FileModelClass {
    static async upload(files: any) {
        try{
            const fileArray = files.map((file: any) => ({
                filename: file.originalname,
                mimetype: file.mimetype,
                data: file.buffer
            }))

            const savedFiles = new FileModel({files: fileArray});

            await savedFiles.save();

            return {status: true, message: "Files uploaded successfully.", id: savedFiles._id};
        }catch(err: any) {
            return {status: false, message: `Error uploading file: ${err.message}`};
        }
    }

    static async getFileById(id: string) {
        try{
            const files = await FileModel.findById(id);

            if(!files) return {status: false, message: "File not found"};

            return {status: true, message: "File Found", files: files};

        }catch(err: any) {
            return {status: false, message: `Error getting file with id ${id}`};
        }
    }
}