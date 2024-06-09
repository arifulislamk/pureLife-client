import { useMutation, useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useAuth from "../../../../hooks/useAuth";
import LoadingSpiner from "../../../../components/Shared/LoadingSpiner";
import { Helmet } from "react-helmet-async";

const ManageCamps = () => {
    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()

    const { data: campsData = [], isLoading, refetch } = useQuery({
        queryKey: ['data', user?.email],
        queryFn: async () => {
            const { data } = await axiosSecure(`/camps/user/${user?.email}`)
            return data
        }
    })
    console.log(campsData)

    const { mutateAsync } = useMutation({
        mutationKey: ['camps'],
        mutationFn: async (id) => {
            const { data } = await axiosSecure.delete(`/camps/delete/${id}`)
            return data
        },
        onSuccess: () => {
            toast.success('Camps Delete succesful!')
            refetch()
        }

    })

    const handelDelete = (id) => {
        console.log(id)
        // delete camps 
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
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
    if (isLoading) return <LoadingSpiner />
    return (
        <div>
            <Helmet>
                <title>PureLife Health | ManageCamps</title>
            </Helmet>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Camp Name</th>
                            <th>Date</th>
                            <th>Location</th>
                            <th>Healthcare Professional</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            campsData?.map((camp, index) => <tr key={camp._id}>
                                <td>{index + 1}</td>
                                <td>{camp.campName}</td>
                                <td> {new Date(camp.dateAndTime).toLocaleDateString('en-GB', {
                                    day: '2-digit',
                                    month: '2-digit',
                                    year: 'numeric'
                                })}</td>
                                <td>{camp.location}</td>
                                <td>{camp.healthcareProfessional}</td>
                                <td>
                                    <Link to={`/dashboard/update-camp/${camp._id}`}>
                                        <button onClick={refetch()} className="btn  hover:btn-info"><FaRegEdit className="text-2xl" /></button>
                                    </Link>
                                </td>

                                <td>
                                    <button onClick={() => handelDelete(camp._id)} className="btn hover:btn-ghost"><MdDelete className=" text-red-600 text-3xl" /></button>
                                </td>
                            </tr>)
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageCamps;