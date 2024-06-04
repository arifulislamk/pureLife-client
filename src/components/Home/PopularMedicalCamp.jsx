
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const PopularMedicalCamp = () => {

    const axiosPublic = useAxiosPublic()
    // const [data, setData] = useState([])
    // useEffect(() => {
    //     axios('http://localhost:5000/camps')
    //         .then(data => {
    //             setData(data.data)
    //         })
    // }, [])

    const { data: camps = [] , isLoading } = useQuery({
        queryKey: ['camps'],
        queryFn: async () => {
            const { data } = await axiosPublic('/campsSix')
            return data
        }
    })

    if(isLoading || camps.length < 1 ) return <p>loading</p>
    return (
        <div className=" mt-20">
            <h2 className=" text-5xl font-bold text-center mb-14">Popular Medical Camps</h2>
            <div className=" grid grid-cols-2 gap-5">
                {
                    camps.length > 0 && camps.map((camp) =>
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

            <div className=" text-center mt-6 mb-10">
                <Link to='/available-camps'>  <button className="btn">See All Camps</button></Link>
            </div>
        </div >
    );
};

export default PopularMedicalCamp;