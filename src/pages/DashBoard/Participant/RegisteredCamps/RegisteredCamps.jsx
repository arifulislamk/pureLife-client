import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useAuth from "../../../../hooks/useAuth";
import LoadingSpiner from "../../../../components/Shared/LoadingSpiner";
import Paymodal from "../../../../Modal/Paymodal";
import { useState } from "react";

const RegisteredCamps = () => {
    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()
    const { data: userData, isLoading } = useQuery({
        queryKey: ['participant'],
        queryFn: async () => {
            const { data } = await axiosSecure(`/participant/user/${user?.email}`)
            return data
        }
    })
    console.log(userData)

    const [isOpen, setIsOpen] = useState(false)
    const closeModal = () => {
        setIsOpen(false)
    }

    const [id, setId] = useState()
    console.log(id)
    const findCampbyid = userData?.find(camp => camp._id === id)
    console.log(findCampbyid, ' are id diye khuje vai')
    if (isLoading) return <LoadingSpiner />
    return (
        <div>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>Camp name</th>
                            <th>Camps Fees</th>
                            <th>Organizer Email</th>
                            <th>Participant Name</th>
                            <th>Payment Status</th>
                            <th>Confirmation Status</th>
                            <th>Cencel Button</th>
                            <th>FeedBack Button</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            userData?.map(camp => <tr key={camp._id}>
                                <th>{camp.campName}</th>
                                <td>{camp.campFees}</td>
                                <td>{camp.organizerEmail}</td>
                                <td>{camp.participantName}</td>
                                <td>
                                    <button onClick={() => {
                                        setIsOpen(true)
                                        setId(camp._id)
                                    }
                                    } className=" btn">
                                        {camp?.status ? camp?.status : 'pay'}
                                    </button>
                                </td>
                                <td>{camp?.status ? camp?.status : 'pending'}</td>
                                <td><button className="btn">X</button></td>
                                <td>[feedback]</td>
                            </tr>)
                        }

                    </tbody>
                </table>
                <Paymodal
                    closeModal={closeModal}
                    isOpen={isOpen}
                    camp={findCampbyid} />
            </div>
        </div>
    );
};

export default RegisteredCamps;