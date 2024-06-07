import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useState } from "react";
import { AiOutlineBars } from "react-icons/ai";
import { GrLogout } from "react-icons/gr";
import MenuItem from "../DashBoard/Menu/MenuItem";
import { FaHospitalUser, FaPlus } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { MdLocalHospital } from "react-icons/md";
import { IoAnalytics } from "react-icons/io5";
import { CiDollar } from "react-icons/ci";
import useOrganizer from "../../hooks/useOrganizer";

const Sidebar = () => {
    const { logOut } = useAuth()
    const [isActive, setActive] = useState(false)

    const [role, isLoading] = useOrganizer()
    const handleToggle = () => {
        setActive(!isActive)
    }

    return (
        <>
            {/* Small Screen Navbar */}
            <div className='bg-gray-100 text-gray-800 flex justify-between md:hidden'>
                <div>
                    <div className='block cursor-pointer p-4 font-bold'>
                        <Link to='/'>
                            <img
                                // className='hidden md:block'
                                src='https://i.ibb.co/4ZXzmq5/logo.png'
                                alt='logo'
                                width='100'
                                height='100'
                            />
                        </Link>
                    </div>
                </div>

                <button
                    onClick={handleToggle}
                    className='mobile-menu-button p-4 focus:outline-none focus:bg-gray-200'
                >
                    <AiOutlineBars className='h-5 w-5' />
                </button>
            </div>

            {/* Sidebar */}
            <div
                className={`z-10 md:fixed flex flex-col justify-between overflow-x-hidden bg-gray-100 w-64 space-y-6 px-2 py-4 absolute inset-y-0 left-0 transform ${isActive && '-translate-x-full'
                    }  md:translate-x-0  transition duration-200 ease-in-out`}
            >
                <div>
                    <div>
                        <div className='w-full hidden md:flex px-4 py-2 shadow-lg rounded-lg justify-center items-center bg-rose-100 mx-auto'>
                            <Link to='/'>
                                <img
                                    // className='hidden md:block'
                                    className=" rounded-2xl"
                                    src='https://i.ibb.co/fGQ9gfb/medical-logo.png'
                                    alt='logo'
                                    width='200'
                                    height='100'
                                />
                            </Link>
                        </div>
                    </div>

                    {/* Nav Items */}
                    <div className='flex flex-col justify-between flex-1 mt-6'>
                        <nav>
                            {/* organizer menu  */}

                            {
                                role === 'organizer' ?
                                    <>
                                        <MenuItem address='organizer-profile' label='Organizer Profile' icon={CgProfile} />
                                        <MenuItem address='addCamp' label='Add A Camp' icon={FaPlus} />
                                        <MenuItem address='manage-camps' label='Manage Camps' icon={MdLocalHospital} />
                                        <MenuItem address='manage-registered-camps' label='Manage Registered Camps' icon={FaHospitalUser} />

                                    </> :
                                    <>
                                        <MenuItem address='analytics' label='Analytics' icon={IoAnalytics} />
                                        <MenuItem address='participant-profile' label='Participant Profile' icon={CgProfile} />
                                        <MenuItem address='payment-history' label='Payment History' icon={CiDollar} />
                                        <MenuItem address='registered-camps' label='Registered Camps' icon={FaHospitalUser} />
                                    </>
                            }

                            {/* participant menu  */}

                        </nav>
                    </div>
                </div>

                <div>
                    <hr />
                    <button
                        onClick={logOut}
                        className='flex w-full items-center px-4 py-2 mt-5 text-gray-600 hover:bg-gray-300   hover:text-gray-700 transition-colors duration-300 transform'
                    >
                        <GrLogout className='w-5 h-5' />

                        <span className='mx-4 font-medium'>Logout</span>
                    </button>
                </div>
            </div>
        </>
    );
};

export default Sidebar;