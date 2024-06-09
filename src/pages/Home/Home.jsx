
import PopularMedicalCamp from "../../components/Home/PopularMedicalCamp";
import Carousel from "../../components/Home/Carousel";
import { Helmet } from "react-helmet-async";
import Feedback from "../../components/Home/Feedback";
import DoctorHomeSection from '../../components/Home/DoctorHomeSection';
import ContactUs from '../ContactUs/ContactUs';

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>PureLife Health | Home</title>
            </Helmet>
            <div className=" mt-14 h-[500px] ">
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