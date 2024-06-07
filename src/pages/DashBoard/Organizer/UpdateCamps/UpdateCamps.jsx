import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useAuth from "../../../../hooks/useAuth";
import toast from "react-hot-toast";
import { imageUpload } from "../../../../utility";
import LoadingSpiner from "../../../../components/Shared/LoadingSpiner";

const UpdateCamps = () => {
    const { register, handleSubmit } = useForm()
    const { user } = useAuth()
    const [imagePreview, setImagePreview] = useState();
    const [imageText, setimageText] = useState('');
    const [image, setimage] = useState();
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
            console.log(campData.image)
            setLoading(true)
            const image_url = await imageUpload(image)
            const updateData = { ...data, dateAndTime: startDate, organizerEmail: user?.email, image: image_url }
            console.log(updateData)

            await axiosSecure.patch(`/camps/update/${campId}`, updateData)
            setLoading(false)
            navigate('/dashboard/manage-camps')
            refetch()
        } catch (err) {
            console.log(err)
            toast.error('image or any input not available')
            setLoading(false)
            refetch()
        }
    }
    const handleImage = image => {
        setImagePreview(URL.createObjectURL(image))
        setimageText(image.name)
        setimage(image)
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
                    <div className=' p-4 bg-white w-full rounded-lg flex justify-around items-center'>
                        <div className='file_upload px-3 py-2 relative border-2 border-double border-gray-300 rounded-lg'>
                            <div className='flex flex-col w-max mx-auto text-center'>
                                <label>
                                    <input
                                        name="photo"
                                        className='text-sm cursor-pointer w-36 hidden'
                                        type='file'
                                        onChange={e => {
                                            handleImage(e.target.files[0])
                                        }}
                                        id='image'
                                        accept='image/*'
                                        hidden
                                    />
                                    <div className='bg-green-800 text-white border border-gray-300 rounded font-semibold cursor-pointer p-1 px-3 hover:bg-yellow-500'>
                                        <p>Upload Image</p>
                                        {imageText.length > 20 ? imageText.split('.')[0].slice(0, 15) + ' ...' + imageText.split('.')[1] : imageText}

                                    </div>
                                </label>
                            </div>
                        </div>

                        <div className=" h-16 w-16 object-cover overflow-hidden flex items-center">{imagePreview && <img src={imagePreview} />}</div>

                    </div>
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