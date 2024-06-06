import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const AddForm = ({
    handleSubmit,
    handlebtn,
    register,
    startDate,
    setStartDate,
    setImagePreview,
    handleImage,
    imagePreview,
    imageText, }) => {
    return (
        <div>
            <form onSubmit={handleSubmit(handlebtn)} className="font-open-sans card-body space-y-4 mb-6 border rounded-lg border-gray-400 md:w-5/6 mx-auto">
                <h2 className="font-poppins font-medium  text-2xl lg:text-5xl text-center ">Add Camps</h2>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text text-xl font-medium">Camps Name :</span>
                    </label>
                    <input
                        {...register('campName')}
                        type="text" name="campName" placeholder="campName" className="input input-bordered" required />
                </div>


                <div className=" flex flex-col md:flex-row gap-5 ">
                    <div className="form-control md:w-1/2 ">
                        <label className="label">
                            <span className="label-text text-xl font-medium">Camp Fees :</span>
                        </label>
                        <input
                            {...register('campFees')}
                            type="text" name="campFees" placeholder="Camp Fees" className="input input-bordered" required />
                    </div>
                    <div className="form-control md:w-1/2">
                        <label className="label">
                            <span className="label-text text-xl font-medium">Location</span>
                        </label>
                        <input
                            {...register('location')} type="text" name="location" placeholder="Location" className="input input-bordered" required />
                    </div>
                </div>
                <div className=" flex flex-col md:flex-row gap-5 ">
                    <div className="form-control md:w-1/2 ">
                        <label className="label">
                            <span className="label-text text-xl font-medium">Healthcare Professional Name :</span>
                        </label>
                        <input
                            {...register('healthcareProfessional')}
                            type="text" name="healthcareProfessional" placeholder="healthcareProfessional" className="input input-bordered" required />
                    </div>
                    <div className="form-control md:w-1/2">
                        <label className="label">
                            <span className="label-text text-xl font-medium">participant count : </span>
                        </label>
                        <input
                            // {...register('participantCount')}
                            readOnly
                            defaultValue={0}
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
                        cols={10} rows={5} name="description" placeholder="description" type="text" className=" outline-none border light:border-gray-500 rounded-lg"></textarea>
                </div>
                <div className="form-control mt-6">
                    <button className="btn bg-orange-400  ">Add Camps</button>
                </div>
            </form>
        </div>
    );
};

export default AddForm;