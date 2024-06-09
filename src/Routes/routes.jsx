import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../pages/Home/Home";
import AvailableCamps from "../pages/AvailableCamps/AvailableCamps";
import Login from "../pages/Login/Login";
import Signup from "../pages/Signup/Signup";
import CampDetails from "../pages/CampDetails/CampDetails";
import PrivateRoutes from "./PrivateRoutes";
import ErrorPage from "../pages/ErrorPage.jsx/ErrorPage";
import DashBoard from "../Layout/DashBoard";
import ManageCamps from "../pages/DashBoard/Organizer/ManageCamps/ManageCamps";
import ManageRegisteredCamps from "../pages/DashBoard/Organizer/ManageRegisteredCamps/ManageRegisteredCamps";
import UpdateCamps from "../pages/DashBoard/Organizer/UpdateCamps/UpdateCamps";
import OrganizerProfile from "../pages/DashBoard/Organizer/OrganizerProfile/OrganizerProfile";
import AddCamp from "../pages/DashBoard/Organizer/AddCamp/AddCamp";
import Analytics from "../pages/DashBoard/Participant/Analytics/Analytics";
import ParticipantProfile from "../pages/DashBoard/Participant/ParticipantProfile/ParticipantProfile";
import PaymentHistory from "../pages/DashBoard/Participant/PaymentHistory/PaymentHistory";
import RegisteredCamps from "../pages/DashBoard/Participant/RegisteredCamps/RegisteredCamps";
import OrganizersRoutes from "./OrganizersRoutes";
import OurDoctor from "../pages/OurDoctor/OurDoctor";
import Postfeddback from "../pages/DashBoard/Participant/Postfeedback/Postfeddback";

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
                path: '/doctors',
                element: <OurDoctor />
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
            // organizer profile 
            {
                path: "addCamp",
                element: <OrganizersRoutes><PrivateRoutes><AddCamp /></PrivateRoutes></OrganizersRoutes>
            },
            {
                path: "organizer-profile",
                element: <OrganizersRoutes><PrivateRoutes><OrganizerProfile /></PrivateRoutes></OrganizersRoutes>
            },
            {
                path: "manage-camps",
                element: <OrganizersRoutes><PrivateRoutes><ManageCamps /></PrivateRoutes></OrganizersRoutes>
            },
            {
                path: "manage-registered-camps",
                element: <OrganizersRoutes><PrivateRoutes><ManageRegisteredCamps /></PrivateRoutes></OrganizersRoutes>
            },
            {
                path: "update-camp/:campId",
                element: <OrganizersRoutes><PrivateRoutes><UpdateCamps /></PrivateRoutes></OrganizersRoutes>
            },

            // participant profile 
            {
                path: "analytics",
                element: <PrivateRoutes><Analytics /></PrivateRoutes>
            },
            {
                path: "participant-profile",
                element: <PrivateRoutes><ParticipantProfile /></PrivateRoutes>
            },
            {
                path: "payment-history",
                element: <PrivateRoutes><PaymentHistory /></PrivateRoutes>
            },
            {
                path: "registered-camps",
                element: <PrivateRoutes><RegisteredCamps /></PrivateRoutes>
            },
            {
                path: "post-feedback",
                element: <PrivateRoutes><Postfeddback /></PrivateRoutes>
            },

        ]
    },
]);
export default router;