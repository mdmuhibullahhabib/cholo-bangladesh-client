import React, { useContext, useState } from 'react';
import { FaUserEdit } from 'react-icons/fa';
import { AuthContext } from '../../Provider/Authprovider';
import { useNavigate } from 'react-router-dom';
import UpdateUser from '../../Components/UpdateUser';
import useUserdata from '../../hooks/useUserdata';

const Profile = () => {
  const { user, setUser } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
    const [userData] = useUserdata()

  return (
    <div>
      <h2 className='text-3xl font-bold mb-4'>Welcome, {userData?.name} 👋!</h2>

      <div className="flex items-center gap-4 mb-4">
        <img src={userData?.image} alt="User" className="w-20 h-20 rounded-full" />
        <div>
          <p><strong>Name:</strong> {userData?.name}</p>
          <p><strong>Email:</strong> {user?.email}</p>
          <p><strong>Role:</strong> Tourist</p>
        </div>
      </div>

      <div className="mt-4 flex flex-col sm:flex-row gap-4">
        <button
          className="btn btn-primary btn-sm flex items-center gap-2"
          onClick={() => setIsOpen(true)}
        >
          <FaUserEdit /> Edit Profile
        </button>
        <button
          className="btn btn-outline btn-sm"
          onClick={() => navigate("/dashboard/join-guide")}
        >
          Apply for Tour Guide
        </button>
      </div>

      <UpdateUser
         isOpen={isOpen}
        setIsOpen={setIsOpen}
        user={user}
        setUser={setUser}
      ></UpdateUser>
    </div>
  );
};

export default Profile;
