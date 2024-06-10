
import PopularMedicalCamp from "../../components/Home/PopularMedicalCamp";
import Carousel from "../../components/Home/Carousel";
import { Helmet } from "react-helmet-async";
import Feedback from "../../components/Home/Feedback";
import DoctorHomeSection from '../../components/Home/DoctorHomeSection';
import ContactUs from '../ContactUs/ContactUs';
import { useEffect } from "react";

const Home = () => {
    useEffect(() => {
        window.scroll(0, 0)
    }, [])
    return (
        <div>
            <Helmet>
                <title>PureLife Health | Home</title>
            </Helmet>
            <marquee direction="">
                <h2 className=" mt-4 text-blue-400 text-3xl"> Hi, Welcome to our medical camps website. Join Our next camps fast........ </h2>
            </marquee>
            <div className=" mt-6 md:mt-8 h-[500px] ">
                <Carousel />
            </div>
            <PopularMedicalCamp />
            <DoctorHomeSection />
            <Feedback />
            <ContactUs />
        </div>
    );
};

export default Home;