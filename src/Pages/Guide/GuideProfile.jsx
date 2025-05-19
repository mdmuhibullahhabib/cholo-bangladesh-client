import React, { useState, useContext } from 'react';
import { FaEdit } from 'react-icons/fa';
import { AuthContext } from '../../Provider/Authprovider';
import UpdateUser from '../../Components/UpdateUser';
import useUserdata from '../../hooks/useUserdata';

const GuideProfile = () => {
  const { user, setUser } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const[userData] = useUserdata()

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded">
      <h1 className="text-2xl font-bold mb-4">Welcome, {userData?.name || 'Tourist'}!</h1>

      <div className="flex items-center gap-6 mb-4">
        <img
          src={userData?.photo}
          alt="Profile"
          className="w-24 h-24 rounded-full object-cover border"
        />
        <div>
          <p className="text-lg font-semibold">Name: {userData?.name}</p>
          <p className="text-md">Email: {userData?.email}</p>
          <p className="text-md capitalize">Role: {userData?.role}</p>
        </div>
      </div>
      <button onClick={() => setIsOpen(true)} className="btn btn-primary flex items-center gap-2">
        <FaEdit /> Edit Profile
      </button>

      <UpdateUser
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        user={user}
        setUser={setUser}
      ></UpdateUser>
    </div>
  );
};

export default GuideProfile