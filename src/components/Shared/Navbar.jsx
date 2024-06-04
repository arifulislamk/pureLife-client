import { Link, NavLink } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const Navbar = () => {
    const { user, logOut } = useAuth()
    const navItems = <>
        <li><NavLink to='/'>Home</NavLink></li>
        <li><NavLink to='/available-camps'>Available Camps</NavLink></li>
        {!user && <li><NavLink to='/join-us' >Join US</NavLink></li>}
    </>

    const handleLogout = () => {
        logOut()
    }
    return (
        <div className="navbar bg-base-100">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        {navItems}
                    </ul>
                </div>
                <Link to='/' className=" text-xl"><img
                    // className='hidden md:block'
                    className=" rounded-2xl"
                    src='https://i.ibb.co/fGQ9gfb/medical-logo.png'
                    alt='logo'
                    width='200'
                    height='100'
                /></Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {navItems}
                </ul>
            </div>
            <div className="navbar-end">
                {
                    user ? <>
                        <div className="z-50 dropdown dropdown-bottom dropdown-end">
                            <div tabIndex={0} role="button" className=" m-1"><img className=" w-10 rounded-full" referrerPolicy="no-referrer" src={user?.photoURL} alt="" /></div>
                            <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                                <li><Link >{user?.displayName ? user?.displayName : 'No Name Available'}</Link></li>
                                <li><Link to='/dashboard'>DashBoard</Link></li>

                                <p className=" mt-6 ml-6 text-red-700 font-medium"><Link onClick={handleLogout}>LogOut</Link></p>
                            </ul>
                        </div>
                    </> :
                        <Link to='/login' className="btn">Login</Link>
                }
            </div>
        </div>
    );
};

export default Navbar;