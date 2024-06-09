import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import LoadingSpiner from "../Shared/LoadingSpiner";

const Feedback = () => {
    const axiosPublic = useAxiosPublic()
    const { data: feedbackData, isLoading } = useQuery({
        queryKey: ['feedback'],
        queryFn: async () => {
            const { data } = await axiosPublic('/feedback')
            return data
        }
    })
    console.log(feedbackData)

    if (isLoading) return <LoadingSpiner />
    return (
        <div className="text-center font-algeria rounded-lg mb-5 lg:mb-10 mt-40">
            <h2 className="mb-5 lg:mb-20 text-center font-roboto font-extrabold text-2xl lg:text-5xl"> Feedback and Ratings </h2>

            <div className=" grid md:grid-cols-2 lg:grid-cols-3 gap-2 lg:gap-5">

                {
                    feedbackData.map(feedback => <div key={feedback.feed} className="container  bg-base-200 flex flex-col w-full max-w-lg px-3 lg:p-6 mx-auto divide-y rounded-lg dark:divide-gray-300 dark:bg-gray-50 dark:text-gray-800">
                        <div className="flex justify-between p-4">
                            <div className="flex space-x-4">
                                <div>
                                    <img src={feedback?.photo} alt="" className="object-cover w-12 h-12 rounded-full dark:bg-gray-500" />
                                </div>
                                <div>
                                    <h4 className=" text-2xl font-medium font-algeria">{feedback?.name}</h4>
                                    <span className="text-xl dark:text-gray-600">
                                        {new Date(feedback?.date).toLocaleDateString('en-GB', {
                                            day: '2-digit',
                                            month: '2-digit',
                                            year: 'numeric'
                                        })}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="p-4 space-y-2 text-sm text-start dark:text-gray-600">
                            <p>
                                {feedback?.comment}
                            </p>
                        </div>
                    </div>)
                }
            </div>

        </div>
    );
};

export default Feedback;