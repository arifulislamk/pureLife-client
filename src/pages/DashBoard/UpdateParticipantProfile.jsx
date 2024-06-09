import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const UpdateParticipantProfile = () => {
    const { user } = useAuth()
    const { register, handleSubmit } = useForm()
    const navigate = useNavigate()
    const axiosSecure = useAxiosSecure()
    
    const { mutateAsync } = useMutation({
        mutationKey: ['user'],
        mutationFn: async (newUser) => {
            const { data } = await axiosSecure.patch(`/user/update/${user?.email}`, newUser)
            return data
        }
    })

    const handleupdate = async data => {
        const name = data.name;
        const phoneNumber = parseInt(data.phone);
        const email = data.email;
        // console.log(data, name, phoneNumber, email)
        try {
            const newUser = { name, phoneNumber, email }
            const data = await mutateAsync(newUser)
            console.log(data)
            navigate('/dashboard/participant-profile')
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <div className="bg-blue-100 py-10 min-h-screen rounded-lg">
            <h2 className="font-poppins font-medium  mt-5 mb-5 text-2xl lg:text-3xl text-center ">Update Your Profile</h2>
            <form onSubmit={handleSubmit(handleupdate)}>
                <div className=" max-w-lg mx-auto space-y-3 ">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-medium">Change Your Name :</span>
                        </label>
                        <input
                            {...register('name')}
                            type="text"
                            defaultValue={user.displayName}
                            name="name"
                            placeholder="Your Name"
                            className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text  font-medium">Change Your Email :</span>
                        </label>
                        <input
                            {...register('email')}
                            defaultValue={user?.email}
                            type="email"
                            name="email"
                            placeholder="Your Email"
                            className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text  font-medium">Change Your Phone :</span>
                        </label>
                        <input
                            {...register('phone')}
                            defaultValue={user?.phoneNumber}
                            type="number"
                            name="phone"
                            placeholder="Your Phone Number"
                            className="input input-bordered" required />
                    </div>
                    <div className=" text-center">
                        <input className="btn bg-blue-300" type="submit" value="Submit" />
                    </div>
                </div>

            </form>
        </div>
    );
};

export default UpdateParticipantProfile;