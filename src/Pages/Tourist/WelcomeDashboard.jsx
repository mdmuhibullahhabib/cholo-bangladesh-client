import React from 'react'
import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { FaUser, FaMapMarkedAlt, FaBookOpen } from "react-icons/fa";
import { MdOutlineEmojiTravel } from "react-icons/md";
import useBooked from '../../hooks/useBooked';
import { useQuery } from '@tanstack/react-query';
import usePackage from '../../hooks/usePackage';

const WelcomeDashboard = () => {
  const { user } = useContext(AuthContext);
  const [bookings] = useBooked()
  const [packages ] = usePackage()

  const { data: stories = [] } = useQuery({
    queryKey: ['story'],
    queryFn: async () => {
      const res = await axiosSecure.get(`/story?email=${user.email}`)
      return res.data;
    }
  })

  return (
    <div className="p-4">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-primary">
          Welcome to Your Dashboard, {user?.displayName?.split(" ")[0] || "Explorer"}!
        </h1>
        <p className="text-lg text-gray-500 mt-2">
          {user?.role === "admin"
            ? "Manage the world of tourism from here."
            : user?.role === "guide"
              ? "Your journey to guiding travelers begins here."
              : "Track your travel stories, bookings, and more!"}
        </p>
      </div>

      {/* User Info Card */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="card bg-base-200 shadow-md p-4">
          <div className="flex items-center gap-4">
            <img
              src={user?.photoURL || "/default-avatar.png"}
              alt="User"
              className="w-16 h-16 rounded-full border"
            />
            <div>
              <h2 className="text-lg font-semibold">{user?.displayName}</h2>
              <p className="text-sm text-gray-500">{user?.email}</p>
              <span className="badge badge-primary mt-1 capitalize">{user?.role || "tourist"}</span>
            </div>
          </div>
        </div>

        {/* Dashboard Widgets */}
        <div className="card bg-base-200 shadow-md p-4 flex items-center">
          <FaMapMarkedAlt className="text-4xl text-success" />
          <div className="ml-4">
            <h3 className="text-xl font-semibold">{bookings.length}</h3>
            <p className="text-sm text-gray-500">Total Bookings</p>
          </div>
        </div>

        <div className="card bg-base-200 shadow-md p-4 flex items-center">
          <FaBookOpen className="text-4xl text-warning" />
          <div className="ml-4">
            <h3 className="text-xl font-semibold">{stories.length}</h3>
            <p className="text-sm text-gray-500">Stories Shared</p>
          </div>
        </div>

        <div className="card bg-base-200 shadow-md p-4 flex items-center">
          <MdOutlineEmojiTravel className="text-4xl text-accent" />
          <div className="ml-4">
            <h3 className="text-xl font-semibold">{packages.length}</h3>
            <p className="text-sm text-gray-500">Available Tours</p>
          </div>
        </div>
      </div>

      {/* Fun Quote */}
      <div className="mt-10 bg-gradient-to-r from-blue-100 to-teal-100 p-6 rounded-lg shadow-inner text-center">
        <h2 className="text-xl font-bold mb-2">🌍 Travel Quote of the Day</h2>
        <p className="italic text-gray-700 max-w-xl mx-auto">
          "Traveling – it leaves you speechless, then turns you into a storyteller." — Ibn Battuta
        </p>
      </div>
    </div>
  );
};

export default WelcomeDashboard