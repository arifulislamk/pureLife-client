import { useContext } from "react";
import Banner from "../../components/Home/Banner";
import PopularMedicalCamp from "../../components/Home/PopularMedicalCamp";
import { AuthContext } from "../../Provider/AuthProviders";

const Home = () => {
    const { name } = useContext(AuthContext)
    return (
        <div>
            <h2>This Home Section {name}</h2>
            <Banner />
            <PopularMedicalCamp />
        </div>
    );
};

export default Home;