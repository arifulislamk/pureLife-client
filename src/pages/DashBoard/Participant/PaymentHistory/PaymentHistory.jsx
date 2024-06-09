import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useAuth from "../../../../hooks/useAuth";
import LoadingSpiner from "../../../../components/Shared/LoadingSpiner";

const PaymentHistory = () => {
    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()
    const { data: userpayment, isLoading } = useQuery({
        queryKey: ['payment'],
        queryFn: async () => {
            const { data } = await axiosSecure(`/paymentinfo/user/${user?.email}`)
            return data
        }
    })
    console.log(userpayment)
    if(isLoading) return <LoadingSpiner />
    return (
        <div>
            <h1 className=" text-center text-4xl font-semibold mb-10">Payment History</h1>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr className=" text-xl bg-gray-200">
                            <th>No.</th>
                            <th>CampName</th>
                            <th>CampFees</th>
                            <th>TransectionId</th>
                            <th>Payment Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            userpayment.map((payment, index) => <tr key={payment.campId}>
                                <td>{index + 1}</td>
                                <td>{payment.campName}</td>
                                <td>{payment.campFees}</td>
                                <td>{payment.transactionId}</td>
                                <td>
                                    {new Date(payment.date).toLocaleDateString('en-GB', {
                                        day: '2-digit',
                                        month: '2-digit',
                                        year: 'numeric'
                                    })}
                                </td>
                            </tr>)
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PaymentHistory;