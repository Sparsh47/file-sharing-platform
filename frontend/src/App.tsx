import {RouterProvider} from "react-router/dom";
import {createBrowserRouter} from "react-router";
import Home from "./pages/Home.tsx";
import Upload from "./pages/Upload.tsx";
import Download from "./pages/Download.tsx";

const router = createBrowserRouter([
 {
  path: "/",
  element: <Home />
 },
 {
  path: "/upload",
  element: <Upload />
 },
 {
  path: "/download/:id",
  element: <Download />
 }
])

export default function App() {
 return (
     <RouterProvider router={router} />
 )
}