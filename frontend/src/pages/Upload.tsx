import {ChangeEvent, useEffect, useRef, useState} from "react";
import { IoIosSend } from "react-icons/io";
import { MdFileUpload } from "react-icons/md";
import {MoonLoader} from "react-spinners";

function Upload() {

    const [files, setFiles] = useState<{files?:FileList}>({});
    const [loading, setLoading] = useState<boolean>(false);

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
        if(!e.target.files) return;
        setLoading(true);
        setFiles((prev) => ({...prev, [e.target.name]: e.target.files}));
        console.log(e.target.files);
    }

    function handleSubmit() {
        if(isEmpty(files)) return;
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
            <input ref={fileRef} multiple type="file" className="hidden" onChange={handleFileUpload} />
        </div>
    )
}

export default Upload;
