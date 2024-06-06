import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useAuth from "../../../../hooks/useAuth";

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
    if (isLoading) return <p>loading </p>
    return (
        <div>
            <h2>Registered Camps</h2>

            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>Camp name</th>
                            <th>Camps Fees</th>
                            <th>Participant Name</th>
                            <th>Payment Status</th>
                            <th>Confirmation Status</th>
                            <th>Cencel Button</th>
                            <th>FeedBack Button</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            userData.map(camp => <tr key={camp._id}>
                                <th>{camp.campName}</th>
                                <td>{camp.campFees}</td>
                                <td>{camp.participantName}</td>
                                <td>Blue</td>
                            </tr>)
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default RegisteredCamps;