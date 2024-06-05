import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../pages/Home/Home";
import AvailableCamps from "../pages/AvailableCamps/AvailableCamps";
import JoinUs from "../pages/JoinUs/JoinUs";
import Login from "../pages/Login/Login";
import Signup from "../pages/Signup/Signup";
import CampDetails from "../pages/CampDetails/CampDetails";
import PrivateRoutes from "./PrivateRoutes";
import ErrorPage from "../pages/ErrorPage.jsx/ErrorPage";
import DashBoard from "../Layout/DashBoard";
import OrganizerProfile from "../pages/DashBoard/OrganizerProfile/OrganizerProfile";
import ManageCamps from "../pages/DashBoard/ManageCamps/ManageCamps";
import ManageRegisteredCamps from "../pages/DashBoard/ManageRegisteredCamps/ManageRegisteredCamps";
import AddCamp from "../pages/DashBoard/AddCamp/AddCamp";
import UpdateCamps from "../pages/DashBoard/UpdateCamps";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Main />,
        errorElement: <ErrorPage />,
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
                path: '/camps/:id',
                element: <PrivateRoutes><CampDetails /></PrivateRoutes>,
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
    {
        path: "/dashboard",
        element: <PrivateRoutes><DashBoard /></PrivateRoutes>,
        children: [
            {
                path: "addCamp",
                element: <PrivateRoutes><AddCamp /></PrivateRoutes>
            },
            {
                path: "organizer-profile",
                element: <PrivateRoutes><OrganizerProfile /></PrivateRoutes>
            },
            {
                path: "manage-camps",
                element: <PrivateRoutes><ManageCamps /></PrivateRoutes>
            },
            {
                path: "manage-registered-camps",
                element: <PrivateRoutes><ManageRegisteredCamps /></PrivateRoutes>
            },
            {
                path: "update-camp/:campId",
                element: <PrivateRoutes><UpdateCamps /></PrivateRoutes>
            },
        ]
    },
]);
export default router;