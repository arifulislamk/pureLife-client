import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useAuth from "../../../../hooks/useAuth";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet-async";

const Postfeddback = () => {
    const { register, handleSubmit } = useForm()
    const axiosSecure = useAxiosSecure()
    const { user } = useAuth()
    const navigate = useNavigate()

    const handlefeedback = async formData => {
        const feedbackPost = {
            comment: formData?.feed,
            user: user?.email,
            name: user?.displayName,
            photo: user?.photoURL,
            date: new Date(),
        }

        try {
            // post feedback 
            const { data } = await axiosSecure.post('/feedback', feedbackPost)
            toast.success('Thank you for Your Feedback')
            navigate('/')
        } catch (err) {
            // console.log(err)
        }
    }
    return (
        <div className="flex  flex-col  p-8  shadow-sm rounded-xl lg:p-12 dark:bg-gray-50 dark:text-gray-800">
            <Helmet>
                <title>PureLife Health | FeedBack</title>
            </Helmet>
            <form onSubmit={handleSubmit(handlefeedback)} className="flex flex-col items-center w-full">
                <h2 className="text-5xl font-semibold text-center"> Give Your opinion!</h2>
                <div className="flex flex-col items-center py-6 space-y-3">
                    <span className="text-center text-xl">How was your experience?</span>

                </div>
                <div className="flex flex-col w-full">
                    <textarea
                        {...register('feed')}
                        rows="3" placeholder="Message..." className="p-4 lg:h-60 rounded-md resize-none border-2"
                        required
                    ></textarea>
                </div>

                <button
                    className="py-4 my-8 font-semibold rounded-md bg-blue-300 btn">
                    Submit</button>
            </form>
            <div className="flex items-center justify-center">
                <Link to='/dashboard/registered-camps'>
                    <button rel="noopener noreferrer" className="text-sm btn dark:text-gray-600">Maybe later</button>
                </Link>
            </div>
        </div>
    );
};

export default Postfeddback;