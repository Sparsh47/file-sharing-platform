import {useParams} from "react-router";

export default function Download() {

    const params = useParams();

    return (
        <div className="w-full min-h-screen bg-stone-800 flex flex-col items-center justify-center gap-10">
            <h1 className="text-5xl text-stone-200 font-medium">Download</h1>
            <p className="text-lg text-stone-200">{params.id}</p>
        </div>
    )
}