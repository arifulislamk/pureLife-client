import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { Link } from "react-router-dom";

const AvailableCamps = () => {

    const axiosPublic = useAxiosPublic();

    const { data: camps = [] } = useQuery({
        queryKey: ['camps'],
        queryFn: async () => {
            const { data } = await axiosPublic('/camps')
            return data
        }
    })
    return (
        <div>
            <Helmet>
                <title>PureLife Health | Available Camps</title>
            </Helmet>
            <h2 className=" text-5xl font-bold text-center mb-14">Available Camps</h2>

            <div className=" grid grid-cols-2 gap-5">
                {
                    camps?.map((camp) =>
                        <Link key={camp._id} to={`/camps/${camp._id}`} >
                            <div className="p-8 bg-base-100 shadow-xl rounded-3xl" >
                                <div className="flex gap-3 ">
                                    <div className=" w-4/5 ">
                                        <img className=" w-full rounded-lg" src={camp.image} alt="Album" />
                                    </div>
                                    <div className=" ">
                                        <p>Location: {camp.location}</p>
                                        <p>Fees: {camp.campFees}</p>
                                        <p>Date: {camp.dateAndTime}</p>
                                        <p>Participant : {camp.participantCount}</p>
                                        <div className=" mt-14">
                                            <h2 className="card-title mb-5">{camp.campName}</h2>
                                            <p>{camp.healthcareProfessional}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    )
                }
            </div>

        </div>
    );
};

export default AvailableCamps;