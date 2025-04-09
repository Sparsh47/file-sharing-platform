import {FileModel} from "../schema/fileSchema.schema";

export default class FileModelClass {
    static async upload(files: any): Promise<{status: boolean, message: string}> {
        try{
            for (const file of files) {
                const newFile = new FileModel({
                    filename: file.filename,
                    mimetype: file.mimetype,
                    data: file.buffer
                });

                await newFile.save();
            }

            return {status: true, message: "Files uploaded successfully."};
        }catch(err: any) {
            return {status: false, message: `Error uploading file: ${err.message}`};
        }
    }
}