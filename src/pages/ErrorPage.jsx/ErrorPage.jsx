import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

const ErrorPage = () => {
    return (
        <div className="flex mt-10 justify-center">
            <Helmet>
                <title>Error</title>
            </Helmet>
            <div>
                <h1 className="text-center text-5xl mt-20">ooooooooops !!!!!!!!!!</h1> <br />
                <h2 className=" text-5xl text-red-600 font-bold">Your path is wrong!</h2>
                <h2 className=" text-3xl mt-20 ">Go Back <Link className="text-green-600" to='/'>Home</Link></h2>

            </div>

            <img src="https://i.ibb.co/nBZhdP6/error.png" alt="" />
        </div>
    );
};

export default ErrorPage;