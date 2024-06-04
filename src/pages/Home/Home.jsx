
import PopularMedicalCamp from "../../components/Home/PopularMedicalCamp";
import Carousel from "../../components/Home/Carousel";
import { Helmet } from "react-helmet-async";

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>PureLife Health | Home</title>
            </Helmet>
            <Carousel />
            <PopularMedicalCamp />
        </div>
    );
};

export default Home;