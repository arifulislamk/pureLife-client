
import { Helmet } from 'react-helmet-async'
import useAuth from '../../../../hooks/useAuth'
import toast from 'react-hot-toast'
import Swal from 'sweetalert2'

const OrganizerProfile = () => {
    const { user, resetPassword, setLoading } = useAuth() || {}
    // handle reset password 
    const handleReset = async () => {
        if (!user.email) return toast.error('please input email frist')
        try {
            await resetPassword(user.email)
            Swal.fire({
                title: "reset successful ! Please cheek your email further process....!",
                icon: "success"
            });
            toast.success(' Please cheek your email further process....')
            setLoading(false)
        } catch (err) {
            console.log(err)
            toast.error(err.message)
            setLoading(false)
        }
        console.log(user.email)
    }
    return (
        <div className='flex justify-center items-center h-screen'>
            <Helmet>
                <title>Profile</title>
            </Helmet>
            <div className=' text-white bg-blue-300 shadow-lg rounded-2xl w-3/5'>
                <div

                    className='w-full bg-blue-300 mb-4 rounded-t-lg h-36'
                />
                <div className=' -mt-16'>
                    <div className=' flex flex-col items-center  p-4 justify-center'>
                        <a href='#' className='relative block'>
                            <img
                                alt='profile'
                                src={user?.photoURL}
                                className='mx-auto object-cover rounded-full h-40 w-50  border-2 border-white '
                            />
                        </a>

                        <p className='p-2 uppercase px-4 text-xs text-white bg-pink-500 rounded-full'>
                            {'Organizer'}
                        </p>
                        <p className='mt-2 text-xl font-medium text-gray-800 '>
                            User Id: {user?.uid}
                        </p>
                    </div>

                    <div className='w-full p-2 mt-4 rounded-lg'>
                        <div className='flex flex-wrap items-center justify-between  text-gray-600 text-xl '>
                            <p className='flex flex-col'>
                                Name
                                <span className='font-bold  '>
                                    {user?.displayName}
                                </span>
                            </p>
                            <p className='flex flex-col'>
                                Email
                                <span className='font-bold  '>{user?.email}</span>
                            </p>

                            <div>
                                <button className='bg-green-800 px-10 py-1 rounded-lg text-white cursor-pointer hover:bg-[#af4053] block mb-1'>
                                    Update Profile
                                </button>
                                <button onClick={handleReset} className='bg-[#F43F5E] px-7 py-1 rounded-lg text-white cursor-pointer hover:bg-[#af4053]'>
                                    Change Password
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='w-full mb-4 bg-blue-300 rounded-t-lg h-36'
                />
            </div>
        </div>
    )
}

export default OrganizerProfile