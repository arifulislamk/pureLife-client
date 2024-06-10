import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useAuth from "../../../../hooks/useAuth";
import toast from "react-hot-toast";
import LoadingSpiner from "../../../../components/Shared/LoadingSpiner";

const UpdateCamps = () => {
    useEffect(() => {
        window.scroll(0, 0)
    }, [])
    const { register, handleSubmit } = useForm()
    const { user } = useAuth()
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate()

    const axiosSecure = useAxiosSecure()
    const { campId } = useParams()
    const { data: campData, isLoading, refetch } = useQuery({
        queryKey: ['camp'],
        queryFn: async () => {
            const { data } = await axiosSecure(`/camps/${campId}`)
            return data
        }
    })
    //update form
    const [startDate, setStartDate] = useState(new Date() || new Date(campData?.dateAndTime));

    const handlebtn = async data => {

        try {
            setLoading(true)
            const updateData = { ...data, dateAndTime: startDate, organizerEmail: user?.email }
          
            await axiosSecure.patch(`/camps/update/${campId}`, updateData)
            setLoading(false)
            navigate('/dashboard/manage-camps')
            toast.success('Camps Updates Done!')
            refetch()
        } catch (err) {
            // console.log(err)
            toast.error('image or any input not available')
            setLoading(false)
            refetch()
        }
    }

    if (isLoading) return <LoadingSpiner />
    const { campFees, campName, description, healthcareProfessional, location, participantCount } = campData;
    return (
        <div>
            <form onSubmit={handleSubmit(handlebtn)} className="font-open-sans card-body space-y-4 mb-6 border rounded-lg border-gray-400 md:w-5/6 mx-auto">
                <h2 className="font-poppins font-medium  text-2xl lg:text-5xl text-center ">Update Camps</h2>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text text-xl font-medium">Camps Name :</span>
                    </label>
                    <input
                        {...register('campName')}
                        defaultValue={campName}
                        type="text" name="campName" placeholder="campName" className="input input-bordered" required />
                </div>


                <div className=" flex flex-col md:flex-row gap-5 ">
                    <div className="form-control md:w-1/2 ">
                        <label className="label">
                            <span className="label-text text-xl font-medium">Camp Fees :</span>
                        </label>
                        <input
                            {...register('campFees')}
                            defaultValue={campFees}
                            type="text" name="campFees" placeholder="Camp Fees" className="input input-bordered" required />
                    </div>
                    <div className="form-control md:w-1/2">
                        <label className="label">
                            <span className="label-text text-xl font-medium">Location</span>
                        </label>
                        <input
                            {...register('location')}
                            defaultValue={location}
                            type="text" name="location" placeholder="Location" className="input input-bordered" required />
                    </div>
                </div>
                <div className=" flex flex-col md:flex-row gap-5 ">
                    <div className="form-control md:w-1/2 ">
                        <label className="label">
                            <span className="label-text text-xl font-medium">Healthcare Professional Name :</span>
                        </label>
                        <input
                            {...register('healthcareProfessional')}
                            defaultValue={healthcareProfessional}
                            type="text" name="healthcareProfessional" placeholder="healthcareProfessional" className="input input-bordered" required />
                    </div>
                    <div className="form-control md:w-1/2">
                        <label className="label">
                            <span className="label-text text-xl font-medium">participant count : </span>
                        </label>
                        <input
                            // {...register('participantCount')}
                            readOnly
                            defaultValue={participantCount}
                            id="number"
                            type="number"
                            name="participantCount" className="input input-bordered" required />
                    </div>
                </div>
                <div className=" flex flex-col md:flex-row gap-3 ">
                    
                    <div className="form-control md:w-1/2">
                        <label className="label">
                            <span className="label-text text-xl font-medium">Date and Time :</span>
                        </label>
                        <DatePicker dateFormat="dd/MM/YYYY" className=" border w-[90%] light:border-gray-500 p-3 text-xl rounded-lg" name="expiredDate" selected={startDate} onChange={(date) => setStartDate(date)} />
                    </div>
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text text-xl font-medium">Description :</span>
                    </label>

                    <textarea
                        {...register('description')}
                        defaultValue={description}
                        cols={10} rows={5} name="description" placeholder="description" type="text" className=" outline-none border light:border-gray-500 rounded-lg"></textarea>
                </div>
                <div className="form-control mt-6">
                    <button disabled={loading} className="btn bg-orange-400  ">Update Now</button>
                </div>
            </form>
        </div>
    );
};

export default UpdateCamps;