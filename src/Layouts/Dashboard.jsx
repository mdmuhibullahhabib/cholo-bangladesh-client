import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import {
  FaUserCog,
  FaTasks,
  FaUsers,
  FaUser,
  FaSuitcase,
  FaPen,
  FaPlusCircle,
  FaUserTie,
  FaUserEdit,
  FaClipboardList,
  FaFolderOpen
} from 'react-icons/fa';
import useRole from '../hooks/useRole';

const Dashboard = () => {
  const [isRole] = useRole();
  console.log(isRole);

  return (
    <div className="flex">
      {/* Sidebar */}
      <aside className="w-64 min-h-screen bg-base-200 p-4">
        <nav className="space-y-2">
          {
            isRole === 'admin' ? (
              <>
                <h2 className="text-xl font-bold mb-4">Admin Dashboard</h2>
                <NavLink
                  to="/dashboard/admin-profile"
                  className={({ isActive }) =>
                    `flex items-center gap-2 w-full btn ${isActive ? 'btn-primary' : 'btn-outline'}`
                  }
                >
                  <FaUserCog />
                  Manage Profile
                </NavLink>
                <NavLink
                  to="/dashboard/manage-candidates"
                  className={({ isActive }) =>
                    `flex items-center gap-2 w-full btn ${isActive ? 'btn-primary' : 'btn-outline'}`
                  }
                >
                  <FaTasks />
                  Manage Candidates
                </NavLink>
                <NavLink
                  to="/dashboard/add-package"
                  className={({ isActive }) =>
                    `flex items-center gap-2 w-full btn ${isActive ? 'btn-primary' : 'btn-outline'}`
                  }
                >
                  <FaPlusCircle />
                  Add Package
                </NavLink>
                <NavLink
                  to="/dashboard/manage-users"
                  className={({ isActive }) =>
                    `flex items-center gap-2 w-full btn ${isActive ? 'btn-primary' : 'btn-outline'}`
                  }
                >
                  <FaUsers />
                  Manage Users
                </NavLink>
              </>
            ) : isRole === 'guide' ? (
              <>
                <h2 className="text-xl font-bold mb-4">Guide Dashboard</h2>
                <NavLink
                  to="/dashboard/guide-profile"
                  className={({ isActive }) =>
                    `flex items-center gap-2 w-full btn ${isActive ? 'btn-primary' : 'btn-outline'}`
                  }
                >
                  <FaUserEdit /> Manage Profile
                </NavLink>
                <NavLink
                  to="/dashboard/assigned-tours"
                  className={({ isActive }) =>
                    `flex items-center gap-2 w-full btn ${isActive ? 'btn-primary' : 'btn-outline'}`
                  }
                >
                  <FaClipboardList /> My Assigned Tours
                </NavLink>
                <NavLink
                  to="/dashboard/add-story"
                  className={({ isActive }) =>
                    `flex items-center gap-2 w-full btn ${isActive ? 'btn-primary' : 'btn-outline'}`
                  }
                >
                  <FaPlusCircle /> Add Stories
                </NavLink>
                <NavLink
                  to="/dashboard/manage-stories"
                  className={({ isActive }) =>
                    `flex items-center gap-2 w-full btn ${isActive ? 'btn-primary' : 'btn-outline'}`
                  }
                >
                  <FaFolderOpen /> Manage Stories
                </NavLink>
              </>
            ) : (
              <>
                <h2 className="text-xl font-bold mb-4">Tourist Dashboard</h2>
                <NavLink
                  to="/dashboard/profile"
                  className={({ isActive }) =>
                    `btn justify-start gap-2 w-full ${isActive ? 'btn-primary' : 'btn-ghost'}`
                  }
                >
                  <FaUser className="text-lg" /> Manage Profile
                </NavLink>
                <NavLink
                  to="/dashboard/bookings"
                  className={({ isActive }) =>
                    `btn justify-start gap-2 w-full ${isActive ? 'btn-primary' : 'btn-ghost'}`
                  }
                >
                  <FaSuitcase className="text-lg" /> My Bookings
                </NavLink>
                <NavLink
                  to="/dashboard/manage-stories"
                  className={({ isActive }) =>
                    `btn justify-start gap-2 w-full ${isActive ? 'btn-primary' : 'btn-ghost'}`
                  }
                >
                  <FaPen className="text-lg" /> Manage Stories
                </NavLink>
                <NavLink
                  to="/dashboard/add-story"
                  className={({ isActive }) =>
                    `btn justify-start gap-2 w-full ${isActive ? 'btn-primary' : 'btn-ghost'}`
                  }
                >
                  <FaPlusCircle className="text-lg" /> Add Stories
                </NavLink>
                <NavLink
                  to="/dashboard/join-guide"
                  className={({ isActive }) =>
                    `btn justify-start gap-2 w-full ${isActive ? 'btn-primary' : 'btn-ghost'}`
                  }
                >
                  <FaUserTie className="text-lg" /> Join as Tour Guide
                </NavLink>
              </>
            )
          }

          <div className="divider"></div>
          <NavLink
            to="/"
            className={({ isActive }) =>
              `block btn w-full text-left ${isActive ? 'btn-primary' : 'btn-ghost'}`
            }
          >
            Home
          </NavLink>
        </nav>
      </aside>

      <main className="flex-1 p-6 bg-base-100">
        <Outlet />
      </main>
    </div>
  );
};

export default Dashboard;
