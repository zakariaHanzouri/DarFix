import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ProtectedRoute from "../components/ProtectedRoute";
import GuestRoute from "../components/GuestRoute";
import Layout from "../components/Layout";
import NotFound from "../pages/NotFound";


const router = createBrowserRouter([
  {
    path: "/",
    element:<ProtectedRoute><Layout/></ProtectedRoute>,
    children:[
     {
       path:"/",
       element:<Home/>
     }
    ]
    
  },
  {
    path: "/login",
    element: (
      <GuestRoute>
        <Login />
      </GuestRoute>
    ),
  },
  {
    path: "/register",
    element: (
      <GuestRoute>
        <Register />
      </GuestRoute>
    ),
  },
  {
    path:"*",
    element: (
     <NotFound/>
    ),
  },
]);

export default router;
