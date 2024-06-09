import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import JoinCampModal from "../../Modal/JoinCampModal";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import LoadingSpiner from "../../components/Shared/LoadingSpiner";

const CampDetails = () => {
    const { id } = useParams();
    // const axiosPublic = useAxiosPublic()
    const axiosSecure = useAxiosSecure()
    const { data: camps = [], isLoading, refetch } = useQuery({
        queryKey: ['camps'],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/camps/${id}`)
            return data
        }
    })

    // console.log(camps);
    const { campName, image, campFees, dateAndTime, location, healthcareProfessional, participantCount, description } = camps;
    console.log(campName)
    
    const [isOpen, setIsOpen] = useState(false)

    const closeModal = () => {
        setIsOpen(false)
    }
    if (isLoading || camps.length < 1) return <LoadingSpiner />
    return (
        <div>
            <div className="font-algeria mx-4 lg:mx-12 ">
                {
                    camps.campName !== 'undefined' ? <Helmet className="text-sm">
                        <title >{`PureLife Health | ${camps?.campName} `}</title>
                    </Helmet> :
                        ''
                }
                <div>
                    <img className="w-full lg:h-[550px] rounded-lg" src={image} alt="" />
                </div>

                <div className=" mt-14 flex gap-7">
                    <div className=" w-1/2">
                        <p className=" text-xl"> <span className=" font-medium mr-6">Details :</span> {description}</p>
                    </div>
                    <div className=" w-1/2 text-3xl space-y-3">
                        <h2 className="lg:mb-6  text-2xl font-roboto lg:text-3xl font-bold">{healthcareProfessional} </h2>
                        <p> <span className="text-3xl font-medium mr-6">Location :</span> {location}</p>
                        <p> <span className="text-3xl font-medium mr-6">Date :</span> {dateAndTime}</p>
                        <p> <span className="text-3xl font-medium mr-6">Fees :</span> {campFees}</p>
                        <p> <span className="text-3xl font-medium mr-6"> Participant : </span> {participantCount}</p>

                        <button onClick={() => setIsOpen(true)} className="bg-[#FF8F40] w-full rounded-md py-3 text-white btn">Join Now Camp
                        </button>
                        {/* join camp modal  */}

                        <JoinCampModal
                            isOpen={isOpen}
                            closeModal={closeModal}
                            refetch={refetch}
                            camps={camps} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CampDetails;