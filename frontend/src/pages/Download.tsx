import {useParams} from "react-router";
import {useEffect, useState} from "react";
import { IoMdDownload } from "react-icons/io";
import JSZip from "jszip";

const apiUrl = import.meta.env.VITE_API_URL;

type FileFromServer = {
    _id: string;
    filename: string;
    mimetype: string;
    data: {
        type: string;
        data: number[];
    };
};

export default function Download() {

    const params = useParams();
    const [files, setFiles] = useState<FileFromServer[]>([]);

    useEffect(()=>{
        async function fetchFiles() {
            const response = await fetch(`${apiUrl}/api/v1/file/download/${params.id}`);
            const files = await response.json();
            console.log("Files: ",files);
            setFiles(files.files);
        }

        fetchFiles();
    }, [params.id])

    function downloadFile(file: {
        filename: string;
        mimetype: string;
        data: { type: string; data: number[] };
    }) {
        const byteArray = new Uint8Array(file.data.data);
        const blob = new Blob([byteArray], { type: file.mimetype });

        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = file.filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }


    async function downloadAllAsZip(files: FileFromServer[]) {
        const zip = new JSZip();

        files.forEach((file) => {
            const byteArray = new Uint8Array(file.data.data);
            zip.file(file.filename, byteArray, { binary: true });
        });

        const content = await zip.generateAsync({ type: "blob" });
        const url = URL.createObjectURL(content);

        const link = document.createElement("a");
        link.href = url;
        link.download = "my-files.zip";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }


    return (
        <div className="w-full min-h-screen bg-stone-800 flex flex-col items-center justify-center gap-10">
            <h1 className="text-5xl text-stone-200 font-medium">Download</h1>
            <div className="w-full md:w-1/2 flex flex-col border border-stone-200 rounded-lg">
                {files.length > 0 && (
                    files.map((file, index)=><div key={index} className={`w-full p-3 flex items-center justify-between border-y border-stone-200 ${(index === files.length-1) && "border-b-transparent"} ${(index === 0) && "border-t-transparent"}`}>
                        <p className="text-stone-200 line-clamp-1">{file.filename}</p>
                        <button onClick={()=>downloadFile(file)} aria-label="download-button" className="btn-class"><IoMdDownload /></button>
                    </div>)
                )}
            </div>
            <button onClick={()=>downloadAllAsZip(files)} className="btn-class"><p>Download All</p><IoMdDownload /></button>
        </div>
    )
}