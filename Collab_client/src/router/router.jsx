import App from "@/App";
import Login from "@/pages/Login";
import Signup from "@/pages/Signup";
import Notfound from "@/pages/Notfound";
import { createBrowserRouter } from "react-router-dom";
import Home from "@/pages/Home";
import Verification from "@/pages/verification";
import Document from "@/pages/Document";


const router = createBrowserRouter(
    [
        {
            path: "/login",
            element: <Login />,
        },
        {
            path: "/register",
            element: <Signup />,
        }, {
            path: "/verification",
            element: <Verification />,
        }
        ,
        {
            path: "/",
            element: <App />,
            children: [
                {
                    path: "/",
                    element: <Home />,
                }
                ,
                {
                    path: "/docs",
                    element: <Home />,
                },
                {
                    path: "/document/:id",
                    element: <Document />,
                }
                ,
                {
                    path: "*",
                    element: <Notfound />,
                },
            ],
        },
        {
            path: "*",
            element: <Notfound />,
        },
    ],
    {
        future: {
            v7_skipActionStatusRevalidation: true,
            v7_relativeSplatPath: true,
            v7_startTransition: true,
            v7_fetcherPersist: true,
            v7_normalizeFormMethod: true,
            v7_partialHydration: true,
            v7_skipActionErrorRevalidation: true,
        },
    }
);

export default router;