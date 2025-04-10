import {Link} from "react-router";

export default function Home() {
    return (
        <div className="w-full min-h-screen bg-stone-800 flex flex-col items-center justify-center gap-5 sm:gap-10">
            <h1 className="text-3xl sm:text-5xl text-stone-200 font-medium">File Sharing Platform</h1>
            <Link to="/upload" className="px-5 py-2 bg-stone-200 rounded-full text-stoe-800">Send a file</Link>
        </div>
    )
}