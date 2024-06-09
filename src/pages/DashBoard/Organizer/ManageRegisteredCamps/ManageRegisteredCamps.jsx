import { useMutation, useQuery } from "@tanstack/react-query";
import { MdDelete } from "react-icons/md";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import LoadingSpiner from "../../../../components/Shared/LoadingSpiner";
import { useState } from "react";
import { Helmet } from "react-helmet-async";

const ManageRegisteredCamps = () => {
    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()
    const { data: userCamps, isLoading, refetch } = useQuery({
        queryKey: ['user'],
        queryFn: async () => {
            const { data } = await axiosSecure(`/participant/${user?.email}`)
            return data
        }
    })

    console.log(userCamps)
    const { mutateAsync } = useMutation({
        mutationKey: ['camps'],
        mutationFn: async (id) => {
            const { data } = await axiosSecure.delete(`/participant/delete/${id}`)
            return data
        },
        onSuccess: () => {
            toast.success('Registered User Delete succesful!')
            refetch()
        }

    })
    const handelCencel = id => {
        console.log(id)
        Swal.fire({
            title: "Are you  cencel this participant?",
            text: "You won't be able to revert this person!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Cencel from Camp!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const data = await mutateAsync(id)
                if (data.deletedCount > 0) {
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your file has been deleted.",
                        icon: "success"
                    });
                }
            }
        });
    }

    const [id, setId] = useState()
    console.log(id)
    const findCampbyid = userCamps?.find(camp => camp._id === id)
    console.log(findCampbyid, ' are id diye khuje vai1')
    const handleConfirmation = async () => {
        console.log('okkkkk confirmation')
        try {
            await axiosSecure.patch(`/participant/confirm/${findCampbyid?._id}`, {
                confirmation: 'Confirmed',
            })
            toast.success('Confirmed Success ')
            refetch()
            // navigate('/dashboard/my-bookings')
        } catch (err) {
            console.log(err)
        }
    }
    if (isLoading) return <LoadingSpiner />
    return (
        <div>
            <Helmet>
                <title>PureLife Health | Regeistred Camps</title>
            </Helmet>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>Participant Name</th>
                            <th>Camp Name</th>
                            <th>Camp Fees</th>
                            <th>Payment Status</th>
                            <th>Confirmation Status</th>
                            <th>Cencel</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            userCamps.map((camp, index) => <tr key={index}>
                                <td>{camp.participantName}</td>
                                <td>{camp.campName}</td>
                                <td>{camp.campFees}</td>
                                <td>
                                    <button
                                        className={" px-3 py-2 rounded-lg w-20 font-medium" + (camp?.status ? " bg-success" : " bg-error text-white")} >
                                        {camp?.status ? camp?.status : 'Unpaid'}
                                    </button>
                                </td>
                                <td>
                                    <button
                                        onClick={() => {
                                            handleConfirmation()
                                            setId(camp._id)
                                        }}
                                        className=" btn">
                                        {camp?.confirmation ? camp?.confirmation : 'Pending'}
                                    </button>
                                </td>
                                <td>
                                    <button onClick={() => handelCencel(camp._id)} className="btn hover:btn-ghost"><MdDelete className=" text-red-600 text-xl" /></button>
                                </td>
                            </tr>)
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageRegisteredCamps;