import { useMutation, useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useAuth from "../../../../hooks/useAuth";
import LoadingSpiner from "../../../../components/Shared/LoadingSpiner";
import Paymodal from "../../../../Modal/Paymodal";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";
import toast from "react-hot-toast";

const RegisteredCamps = () => {
    const { user } = useAuth()
    const [id, setId] = useState()
    const axiosSecure = useAxiosSecure()
    const { data: userData, isLoading, refetch } = useQuery({
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


    console.log(id)
    const findCampbyid = userData?.find(camp => camp._id === id)
    console.log(findCampbyid, ' are id diye khuje vai')


    const { mutateAsync } = useMutation({
        mutationKey: ['camps'],
        mutationFn: async (id) => {
            const { data } = await axiosSecure.delete(`/participant/delete/${id}`)
            return data
        },
        onSuccess: () => {
            toast.success('Join Camps Delete succesful!')
            refetch()
        }

    })
    const handelCencel = id => {
        console.log(id)
        Swal.fire({
            title: "Are You Sure Cencel this Camp Join?",
            text: "You won't be able to revert this person!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Cencel me from Camp!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const data = await mutateAsync(id)
                if (data.deletedCount > 0) {
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your Joining Camps Cenceled.",
                        icon: "success"
                    });
                }
            }
        });
    }
    if (isLoading) return <LoadingSpiner />
    return (
        <div>
            <Helmet>
                <title>PureLife Health | Registred Camps</title>
            </Helmet>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr className=" font-bold bg-gray-200">
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
                                    <button
                                        disabled={camp?.status}
                                        onClick={() => {
                                            setIsOpen(true)
                                            setId(camp._id)
                                        }}
                                        className={"btn" + (camp?.status ? " btn-success" : " btn-success text-white")} >
                                        {camp?.status ? camp?.status : 'pay'}
                                    </button>
                                </td>
                                <td>{camp?.confirmation ? camp?.confirmation : 'pending'}</td>
                                <td>
                                    <button onClick={() => handelCencel(camp._id)} className="btn">X</button>
                                </td>
                                <td>
                                    <Link to='/dashboard/post-feedback'>
                                        <button
                                            disabled={!camp?.confirmation}
                                            className=" btn"
                                        >
                                            {camp?.confirmation ? '[feedback]' : 'N/A'}
                                        </button>
                                    </Link>
                                </td>
                            </tr>)
                        }

                    </tbody>
                </table>
                <Paymodal
                    closeModal={closeModal}
                    isOpen={isOpen}
                    refetch={refetch}
                    camp={findCampbyid} />
            </div>
        </div>
    );
};

export default RegisteredCamps;