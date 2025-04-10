import {ChangeEvent, useEffect, useRef, useState} from "react";
import { IoIosSend } from "react-icons/io";
import { MdFileUpload } from "react-icons/md";
import {MoonLoader} from "react-spinners";
import {Link} from "react-router";

function Upload() {

    const [files, setFiles] = useState<File[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [id, setId] = useState<string>("");

    function isEmpty(obj: object): boolean {
        return Object.keys(obj).length === 0;
    }

    useEffect(() => {
        if(isEmpty(files)) {
            setLoading(false);
        }
        const timeout = setTimeout(()=>{
            setLoading(false);
        }, 3000);

        return () => {
            clearTimeout(timeout);
        }

    }, [files]);

    const fileRef = useRef<HTMLInputElement>(null);

    function handleOpenUpload(){
        if(fileRef.current) {
            fileRef.current.click();
        }
    }

    function handleFileUpload(e: ChangeEvent<HTMLInputElement>) {
        if (!e.target.files) return;
        setLoading(true);
        setFiles(Array.from(e.target.files));
    }

    async function handleSubmit() {
        if(isEmpty(files)) {
            alert("Please select at least one file.");
            return;
        }

        const formData = new FormData();

        files.forEach((file) => {
            formData.append("files", file);
        });

        try {
            const res = await fetch("http://localhost:8080/api/v1/file/upload", {
                method: "POST",
                body: formData,
            });

            const result = await res.json();
            setId(result.id);
            alert("Upload successful!");
            setLoading(true);
            setFiles([]);

        } catch (err) {
            console.error("Upload failed", err);
            alert("Something went wrong!");
        }
    }

    return (
        <div className="w-full min-h-screen bg-stone-800 flex flex-col items-center justify-center gap-10">
            <h1 className="text-5xl font-medium text-stone-200">File Sharing</h1>
            {loading ? (
                <MoonLoader color="#e7e5e4" loading={loading} cssOverride={{
                    display: "block",
                    margin: "0 auto",
                }} size={30} />
            ) : (isEmpty(files) ? <button onClick={handleOpenUpload} className="btn-class"><p>Upload</p><MdFileUpload /></button> : <button onClick={handleSubmit} className="btn-class"><p>Send Files</p><IoIosSend /></button>)
            }
            {id.length>0 && (<Link to={`/download/${id}`} className="underline text-stone-200 font-medium">{`http://localhost:3000/download/${id}`}</Link>)}
            <input ref={fileRef} multiple type="file" className="hidden" onChange={handleFileUpload} />
        </div>
    )
}

export default Upload;
