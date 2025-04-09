import {Response, Request} from "express";
import FileModelClass from "../model/fileModel.model";

export default class FileController {
    async uploadFiles(req: Request, res: Response) {
        try {
            const files = req.files;
            const result = await FileModelClass.upload(files);
            if(result.status) {
                res.status(200).json(result);
            }else{
                res.json(result);
            }
        }catch(err:any) {
            res.status(500).json({
                message: "Something went wrong "+err.message
            })
        }
    }
}