import { use } from "react";
import { FaSignOutAlt } from "react-icons/fa";
import { Link, NavLink } from "react-router";
import { AuthContext } from "../contexts/AuthContext";

const Navbar = () => {
    const { user, userSignOut } = use(AuthContext);

    const handleLogout = () => {
        userSignOut()
            .then(() => console.log("Logged out"))
            .catch((err) => console.error(err));
    };

    const navLinks = (
        <>
            <li>
                <NavLink to="/">Home</NavLink>
            </li>
            <li>
                <NavLink to="/articles">All Articles</NavLink>
            </li>
            {user && (
                <>
                    <li>
                        <NavLink to="/my-articles">My Articles</NavLink>
                    </li>
                    <li>
                        <NavLink to="/post-article">Post Article</NavLink>
                    </li>
                </>
            )}
        </>
    );

    return (
        <div className="navbar bg-base-100 shadow-md px-4 sticky top-0 z-50">
            <div className="navbar-start">
                <Link to="/" className="text-xl font-bold">
                    📚 ThinkUp
                </Link>
            </div>

            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 space-x-1">
                    {navLinks}
                </ul>
            </div>

            <div className="navbar-end">
                {!user ? (
                    <Link to="/auth/login" className="btn btn-primary">
                        Login
                    </Link>
                ) : (
                    <div className="dropdown dropdown-end">
                        <div
                            tabIndex={0}
                            className="btn btn-ghost btn-circle avatar"
                        >
                            <div className="w-10 rounded-full">
                                <img src={user?.photoURL} />
                            </div>
                        </div>
                        <ul
                            tabIndex={0}
                            className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
                        >
                            <li>
                                <NavLink to="/my-articles">My Articles</NavLink>
                            </li>
                            <li>
                                <NavLink to="/post-article">
                                    Post Article
                                </NavLink>
                            </li>
                            <li>
                                <button
                                    onClick={handleLogout}
                                    className="text-error flex items-center gap-2"
                                >
                                    <FaSignOutAlt /> Logout
                                </button>
                            </li>
                        </ul>
                    </div>
                )}
            </div>

            {/* Mobile Menu */}
            <div className="lg:hidden navbar-end">
                <div className="dropdown dropdown-end">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg
                            className="h-5 w-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 8h16M4 16h16"
                            />
                        </svg>
                    </label>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
                    >
                        {navLinks}
                        {user ? (
                            <li>
                                <button
                                    onClick={handleLogout}
                                    className="text-error flex items-center gap-2"
                                >
                                    <FaSignOutAlt /> Logout
                                </button>
                            </li>
                        ) : (
                            <li>
                                <Link to="/auth/login">Login</Link>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
