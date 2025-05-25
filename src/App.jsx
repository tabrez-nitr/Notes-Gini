
import Layout from "./Layout.jsx"
import HomePage from "./components/HomePage.jsx"


import { createBrowserRouter, RouterProvider } from "react-router";
import NotePage from "./components/Notepage.jsx";

const router = createBrowserRouter([
  {
      path: "/",
      element:<Layout/>,
       children:[{
          path:"",
          element:<HomePage/>
       },
      {
          path:"note",
          element:<NotePage/>
      }]
   },
 ]);




function App() {
  return (
    <div>
        <RouterProvider router={router} />
     </div>
  )
}

export default App
