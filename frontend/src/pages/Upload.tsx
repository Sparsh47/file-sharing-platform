import {ChangeEvent, useEffect, useRef, useState} from "react";
import { IoIosSend } from "react-icons/io";
import { MdFileUpload } from "react-icons/md";
import {MoonLoader} from "react-spinners";
import {toast, Toaster} from "react-hot-toast";

const apiUrl = import.meta.env.VITE_API_URL;
const siteUrl = import.meta.env.VITE_SITE_URL;

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

    async function copyToClipboard(text: string){
        await navigator.clipboard.writeText(text);
        toast.success("Copied to clipboard!");
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
            const res = await fetch(`${apiUrl}/api/v1/file/upload`, {
                method: "POST",
                body: formData,
            });

            const result = await res.json();
            setId(result.id);
            toast.success("Upload successful!");
            setLoading(true);
            setFiles([]);

        } catch (err) {
            console.error("Upload failed", err);
            toast.error("Something went wrong!");
        }
    }

    return (
        <div className="w-full min-h-screen bg-stone-800 flex flex-col items-center justify-center gap-5 sm:gap-10 px-5">
            <h1 className="text-3xl sm:text-5xl font-medium text-stone-200">File Sharing</h1>
            {loading ? (
                <MoonLoader color="#e7e5e4" loading={loading} cssOverride={{
                    display: "block",
                    margin: "0 auto",
                }} size={30} />
            ) : (isEmpty(files) ? <button onClick={handleOpenUpload} className="btn-class"><p>Upload</p><MdFileUpload /></button> : <button onClick={handleSubmit} className="btn-class"><p>Send Files</p><IoIosSend /></button>)
            }
            {id.length>0 && (<div className="flex flex-col items-center justify-center gap-2">
                <p className="curtext-stone-200 font-medium text-lg">Share this link:</p>
                <p onClick={()=>copyToClipboard(`${siteUrl}download/${id}`)} className="cursor-pointer underline text-stone-200 font-medium">{`${siteUrl}download/${id}`}</p>
            </div>)}
            <input ref={fileRef} multiple type="file" className="hidden" onChange={handleFileUpload} />
            <Toaster
                position="top-right"
                reverseOrder={false}
            />
        </div>
    )
}

export default Upload;
