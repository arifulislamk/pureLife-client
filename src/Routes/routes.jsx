import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../pages/Home/Home";
import AvailableCamps from "../pages/AvailableCamps/AvailableCamps";
import JoinUs from "../pages/JoinUs/JoinUs";
import Login from "../pages/Login/Login";
import Signup from "../pages/Signup/Signup";
import CampDetails from "../pages/CampDetails/CampDetails";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Main />,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: '/available-camps',
                element: <AvailableCamps />
            },
            {
                path: '/camp-details/:id',
                element: <CampDetails />
            },
            {
                path: '/join-us',
                element: <JoinUs />
            },
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/signup',
                element: <Signup />
            }
        ]
    },
]);
export default router;