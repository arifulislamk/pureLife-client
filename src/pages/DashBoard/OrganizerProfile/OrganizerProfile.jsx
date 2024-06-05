
import { Helmet } from 'react-helmet-async'
import useAuth from '../../../hooks/useAuth'

const OrganizerProfile = () => {
    const { user } = useAuth() || {}

    return (
        <div className='flex justify-center items-center h-screen'>
            <Helmet>
                <title>Profile</title>
            </Helmet>
            <div className=' bg-red-300 shadow-lg rounded-2xl w-3/5'>
            <img
                    alt='profile'
                    src='https://i.ibb.co/fQ9PBkY/download-1.jpg'
                    className='w-full mb-4 rounded-t-lg h-36'
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
                        <div className='flex flex-wrap items-center justify-between text-sm text-gray-600 '>
                            <p className='flex flex-col'>
                                Name
                                <span className='font-bold text-black '>
                                    {user?.displayName}
                                </span>
                            </p>
                            <p className='flex flex-col'>
                                Email
                                <span className='font-bold text-black '>{user?.email}</span>
                            </p>

                            <div>
                                <button className='bg-[#F43F5E] px-10 py-1 rounded-lg text-white cursor-pointer hover:bg-[#af4053] block mb-1'>
                                    Update Profile
                                </button>
                                <button className='bg-[#F43F5E] px-7 py-1 rounded-lg text-white cursor-pointer hover:bg-[#af4053]'>
                                    Change Password
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <img
                    alt='profile'
                    src='https://i.ibb.co/fQ9PBkY/download-1.jpg'
                    className='w-full mb-4 rounded-t-lg h-36'
                />
            </div>
        </div>
    )
}

export default OrganizerProfile