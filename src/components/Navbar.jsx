import { use } from "react";
import { FaSignOutAlt } from "react-icons/fa";
import { Link, NavLink } from "react-router";
import Swal from "sweetalert2";
import { AuthContext } from "../contexts/AuthContext";
import { ThemeContext } from "../contexts/ThemeContext";
import ThemeToggle from "./ThemeToggle";
import logo from "/logo.png";
import logoDark from "/logo_white.png";

const Navbar = () => {
  const { user, userSignOut } = use(AuthContext);
  const { theme } = use(ThemeContext);

  const handleLogout = () => {
    userSignOut()
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Logged out successful!",
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 1500,
        });
      })
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
      <li>
        <NavLink to="/about">About Us</NavLink>
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
        <Link to="/">
          <img
            className="w-30 md:w-40"
            src={theme === "light" ? logo : logoDark}
            alt="ThinkUp Logo"
          />
        </Link>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 space-x-1">{navLinks}</ul>
      </div>

      <div className="navbar-end">
        <div>
          <ThemeToggle />
        </div>
        {!user ? (
          <Link to="/auth/login" className="btn btn-primary">
            Login
          </Link>
        ) : (
          <div className="dropdown dropdown-end">
            <div tabIndex={0} className="btn btn-ghost btn-circle avatar">
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
                <NavLink to="/post-article">Post Article</NavLink>
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

        {/* Mobile Menu */}
        <div className="md:hidden">
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
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
    </div>
  );
};

export default Navbar;
