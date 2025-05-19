import React, { useContext } from 'react'
import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { useState } from "react";
import { AuthContext } from '../Provider/Authprovider';
import useRole from '../hooks/useRole';
// import logo from '../assets/logo.png'

const Navbar = () => {

  const { user, logOut } = useContext(AuthContext);
  const [isRole] = useRole();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = (
    <>
      <li><Link to="/">Home</Link></li>
      <li><Link to="/community">Community</Link></li>
      <li><Link to="/about">About Us</Link></li>
      <li><Link to="/trips">Trips</Link></li>
    </>
  );

  const handleLogout = () => {
    logOut()
      .then(() => { })
      .catch(error => console.log(error));
  }

  return (
    <div className="bg-base-100 bg-opacity-40 shadow-md fixed top-0 left-0 right-0 z-50">
      <div className="navbar max-w-7xl mx-auto px-4">
        {/* Logo + Website Name */}
        <div className="flex-1">
          <Link to="/" className="flex items-center gap-2 text-xl font-bold text-primary">
            {/* <img src={} alt="Logo" className="w-10 h-10" /> */}
            Cholo Bangladesh
          </Link>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex">
          <ul className="menu menu-horizontal px-1">{navLinks}</ul>
        </div>

        {/* Right Side (User/Profile) */}
        <div className="flex items-center gap-2">
          {/* If user not logged in */}
          {
            user && user?.email ? (
              <div className="dropdown dropdown-end">
                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                  <div className="w-10 rounded-full">
                    <img src={user?.photoURL || "/default-avatar.png"} alt="User" />
                  </div>
                </div>
                <ul className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-64">
                  <li className="text-sm text-gray-700 font-semibold px-2">{user?.displayName}</li>
                  <li className="text-xs text-gray-500 px-2 mb-2">{user?.email}</li>
                  {
                    isRole === 'admin' ? <>
                      <li><Link to="/dashboard/admin-profile">Dashboard</Link></li>
                    </> : isRole === 'guide' ? <>
                      <li><Link to="/dashboard/guide-profile">Dashboard</Link></li>
                    </> : <>
                      <li><Link to="/dashboard/profile">Dashboard</Link></li>
                    </>
                  }
                  <li><Link to="/announcements">Offer Announcements</Link></li>
                  <li>
                    <button onClick={handleLogout} className="btn btn-sm btn-error mt-1 text-white">Logout</button>
                  </li>
                </ul>
              </div>
            ) : (
              <div className="hidden md:flex gap-2">
                <Link to="/auth/login" className="btn btn-sm btn-outline">Login</Link>
                <Link to="/auth/register" className="btn btn-sm btn-primary">Register</Link>
              </div>
            )
          }

          {/* Mobile Hamburger */}
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-2xl btn btn-ghost">
              <FaBars />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-base-100 shadow-md">
          <ul className="menu px-4 py-2">{navLinks}</ul>
          {!user && (
            <div className="flex flex-col gap-2 px-4 pb-4">
              <Link to="/auth/login" className="btn btn-sm btn-outline">Login</Link>
              <Link to="/auth/register" className="btn btn-sm btn-primary">Register</Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Navbar;
