
import PopularMedicalCamp from "../../components/Home/PopularMedicalCamp";
import Carousel from "../../components/Home/Carousel";
import { Helmet } from "react-helmet-async";
import Feedback from "../../components/Home/Feedback";

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>PureLife Health | Home</title>
            </Helmet>
            <div className=" mt-8 h-96">
                <Carousel />
            </div>
            <PopularMedicalCamp />
            <Feedback />
        </div>
    );
};

export default Home;