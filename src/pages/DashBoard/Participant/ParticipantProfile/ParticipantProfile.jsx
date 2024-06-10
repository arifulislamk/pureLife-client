import { Helmet } from 'react-helmet-async'
import useAuth from '../../../../hooks/useAuth'
import { Link } from 'react-router-dom'
import useAxiosSecure from '../../../../hooks/useAxiosSecure'
import { useQuery } from '@tanstack/react-query'
import LoadingSpiner from '../../../../components/Shared/LoadingSpiner'

const ParticipantProfile = () => {
    const { user } = useAuth() || {}
    const axiosSecure = useAxiosSecure()
    const { data: users, isLoading } = useQuery({
        queryKey: ['user'],
        queryFn: async () => {
            const { data } = await axiosSecure(`/user/${user?.email}`)
            return data
        }
    })
    console.log(users)
    if (isLoading) return <LoadingSpiner />
    return (
        <>
            <Helmet>
                <title>PureLife Health | Profile </title>
            </Helmet>

            <div className=" mt-2 text-center md:text-3xl  text-blue-800">
                <h2> <span>Hi, {user.displayName}</span> . Welcome back Dashboard </h2>
            </div>
            <div className='md:flex justify-center items-center'>
                <div className=' md:px-20 text-white bg-blue-300 shadow-lg rounded-2xl '>
                    <div className='md:w-full   bg-blue-300 mb-4 rounded-t-lg h-36' />
                    <div className='w-full -mt-16'>
                        <div className=' flex flex-col items-center  p-4 justify-center'>
                            <a href='#' className='relative block'>
                                <img
                                    alt='profile'
                                    src={users?.photo || user?.photoURL}
                                    className='mx-auto object-cover rounded-full md:h-40 md:w-50  border-2 border-white '
                                />
                            </a>

                            <p className='p-2 uppercase px-4 text-xs text-white bg-pink-500 rounded-full'>
                                {'Participant'}
                            </p>
                            <p className='mt-2 md:text-xl font-medium text-gray-800 '>
                                User Id: {user?.uid}
                            </p>
                        </div>

                        <div className='md:w-full p-2 mt-4 rounded-lg'>
                            <div className='flex flex-col md:flex-row gap-3 md:gap-14 md:flex-wrap md:items-center md:justify-between  text-gray-600 md:text-xl '>
                                <p className='flex flex-col'>
                                    Name
                                    <span className='font-bold  '>
                                        {users?.name ? users?.name : user?.displayName}
                                    </span>
                                </p>
                                <p className='flex flex-col'>
                                    Email
                                    <span className='font-bold  '>{users?.email ? users?.email : user?.email}</span>
                                </p>
                                <p className='flex flex-col'>
                                    Phone
                                    <span className='font-bold  '>{users?.phoneNumber}</span>
                                </p>
                            </div>

                            <div>
                                <Link to='/dashboard/update-participant-profile'>
                                    <button className='bg-green-500 mt-10 px-10 py-1 rounded-lg text-white cursor-pointer hover:bg-[#af4053] block mb-1'>
                                        Update Profile
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className='w-full mb-4 bg-blue-300 rounded-t-lg h-36'
                    />
                </div>
            </div>
        </>
    )
}

export default ParticipantProfile