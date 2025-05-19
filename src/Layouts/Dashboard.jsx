import React from 'react'
import { Outlet, NavLink } from 'react-router-dom';
import { FaUserCog, FaTasks, FaUsers, FaUser, FaSuitcase, FaPen, FaPlusCircle, FaUserTie, FaUserEdit, FaClipboardList, FaFolderOpen } from 'react-icons/fa';
import useRole from '../hooks/useRole';


const Dashboard = () => {

  const [isRole] = useRole();
  console.log(isRole)
  
  return (
    <div className="flex">

      {/* Sidebar */}
      <aside className="w-64 min-h-screen bg-base-200 p-4">
        {/* <h2 className="text-xl font-bold mb-4">Tourist Dashboard</h2> */}
        <nav className="space-y-2">
          {
            isRole === 'admin' ? <>
              <h2 className="text-xl font-bold mb-4">Admin Dashboard</h2>
              <NavLink to="/dashboard/admin-profile" className="flex items-center gap-2 w-full btn btn-outline">
                <FaUserCog />
                Manage Profile
              </NavLink>
              <NavLink to="/dashboard/manage-candidates" className="flex items-center gap-2 w-full btn btn-outline">
                <FaTasks />
                Manage Candidates
              </NavLink>
              <NavLink to="/dashboard/add-package" className="flex items-center gap-2 w-full btn btn-outline">
                <FaPlusCircle />
                Add Package
              </NavLink>
              <NavLink to="/dashboard/manage-users" className="flex items-center gap-2 w-full btn btn-outline">
                <FaUsers />
                Manage Users
              </NavLink>
            </> : isRole === 'guide' ? <>

              <h2 className="text-xl font-bold mb-4">Guide Dashboard</h2>
              <NavLink
                to="/dashboard/guide-profile"
                className="flex items-center gap-2 w-full btn btn-outline"
              >
                <FaUserEdit /> Manage Profile
              </NavLink>

              <NavLink
                to="/dashboard/assigned-tours"
                className="flex items-center gap-2 w-full btn btn-outline"
              >
                <FaClipboardList /> My Assigned Tours
              </NavLink>

              <NavLink
                to="/dashboard/add-story"
                className="flex items-center gap-2 w-full btn btn-outline"
              >
                <FaPlusCircle /> Add Stories
              </NavLink>

              <NavLink
                to="/dashboard/manage-stories"
                className="flex items-center gap-2 w-full btn btn-outline"
              >
                <FaFolderOpen /> Manage Stories
              </NavLink>
            </> : <>
              <h2 className="text-xl font-bold mb-4">Tourist Dashboard</h2>
              <NavLink to="/dashboard/profile" className="btn btn-ghost justify-start gap-2 w-full">
                <FaUser className="text-lg" /> Manage Profile
              </NavLink>

              <NavLink to="/dashboard/bookings" className="btn btn-ghost justify-start gap-2 w-full">
                <FaSuitcase className="text-lg" /> My Bookings
              </NavLink>

              <NavLink to="/dashboard/manage-stories" className="btn btn-ghost justify-start gap-2 w-full">
                <FaPen className="text-lg" /> Manage Stories
              </NavLink>

              <NavLink to="/dashboard/add-story" className="btn btn-ghost justify-start gap-2 w-full">
                <FaPlusCircle className="text-lg" /> Add Stories
              </NavLink>

              <NavLink to="/dashboard/join-guide" className="btn btn-ghost justify-start gap-2 w-full">
                <FaUserTie className="text-lg" /> Join as Tour Guide
              </NavLink>
            </>
          }
          <div className="divider"></div>
          <NavLink to="/" className="  block btn btn-ghost w-full text-left"> Home</NavLink>

        </nav>
      </aside>

      <main className="flex-1 p-6 bg-base-100">
        <Outlet></Outlet>
      </main>
    </div>
  )
};

export default Dashboard