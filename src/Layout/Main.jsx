import { Outlet } from "react-router-dom";
import Navbar from "../components/Shared/Navbar";
import Footer from "../components/Shared/Footer";

const Main = () => {
    return (
        <div>
            <Navbar />
            <div className=" min-h-[calc(100vh-290px)] lg:mx-20 mx-5 ">
                <Outlet />
            </div>
            <Footer />
        </div>
    );
};

export default Main;