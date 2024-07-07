import { Link, NavLink } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useOrganizer from "../../hooks/useOrganizer";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const Navbar = () => {
    const { user, logOut } = useAuth()
    const [role] = useOrganizer()

    const axiosSecure = useAxiosSecure()
    const { data: users, isLoading } = useQuery({
        queryKey: ['user'],
        queryFn: async () => {
            const { data } = await axiosSecure(`/user/${user?.email}`)
            return data
        }
    })
    // console.log(users)
    // if (isLoading) return <><p>Navbar now processing</p></>
    const navItems = <>
        <li><NavLink to='/'>Home</NavLink></li>
        <li><NavLink to='/available-camps'>Available Camps</NavLink></li>
        <li><NavLink to='/doctors'>Our Doctors</NavLink></li>
        <li><NavLink to='/contact-us'>Contact Us</NavLink></li>
    </>

    const handleLogout = () => {
        logOut()
    }
    return (
        <div className="navbar bg-blue-200 shadow-xl mb-2 rounded-lg md:rounded-2xl">
            <div className="navbar-start">
                <div className="dropdown z-30">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 ">
                        {navItems}
                    </ul>
                </div>
                <Link to='/' className=" text-xl w-24 md:w-48"><img
                    // className='hidden md:block'
                    className=" rounded-lg md:rounded-2xl"
                    src='https://i.ibb.co/fGQ9gfb/medical-logo.png'
                    alt='logo'
                    height='100'
                /></Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 gap-2">
                    {navItems}
                </ul>
            </div>
            <div className="navbar-end">
                {
                    user ? <>
                        <div className="z-50 dropdown dropdown-bottom dropdown-end">
                            <div tabIndex={0} role="button" className=" flex justify-center items-center  mr-3 gap-3 m-1"><img className=" w-12 h-12 rounded-full" referrerPolicy="no-referrer" src={users?.photo || user?.photoURL} alt="" />
                                <Link onClick={handleLogout}><button className=" btn">LogOut</button></Link>
                            </div>
                            <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                                <li><Link >{user?.displayName ? user?.displayName : 'No Name Available'}</Link></li>
                                {
                                    role === 'organizer' ? <li><Link to='/dashboard/organizer-profile'>DashBoard</Link></li> :
                                        <li><Link to='/dashboard/participant-profile'>DashBoard</Link></li>
                                }
                                <p className=" mt-6 ml-6 text-red-700 font-medium"><Link onClick={handleLogout}>LogOut</Link></p>
                            </ul>
                        </div>
                    </> :
                        <Link to='/login' className="btn">Join Us</Link>
                }
            </div>
        </div>
    );
};

export default Navbar;