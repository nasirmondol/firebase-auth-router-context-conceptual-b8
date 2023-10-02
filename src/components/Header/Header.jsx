import { Link, NavLink } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const Header = () => {
    const { user, logOut } = useAuth();
    console.log(user);
    const links = (
        <div >
            <div className="lg:flex gap-10">
                <li><NavLink to="/">Home</NavLink></li>
                <li><NavLink to="/about">About</NavLink></li>
                <li><NavLink to="/details">Details</NavLink></li>
                <li><NavLink to="/blogs">Blogs</NavLink></li>

            </div>
        </div>
    )
    return (
        <div className="navbar bg-base-100">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        {links}
                    </ul>
                </div>
                <a className="btn btn-ghost normal-case text-xl">daisyUI</a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {links}
                </ul>
            </div>
            <div className="navbar-end">
                {
                    user ? <div className="flex gap-5 items-center">
                        <p>{user?.displayName}</p>
                        <Link to='/login' onClick={logOut} className="btn btn-sm ">Log out</Link>
                        <img className="rounded-full w-8" src={user?.photoURL} alt="" />
                    </div> :
                        <Link to='/login' className="btn btn-sm ">Log In</Link>
                }


            </div>
        </div>
    );
};

export default Header;