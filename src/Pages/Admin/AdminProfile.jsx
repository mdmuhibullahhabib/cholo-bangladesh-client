import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Provider/Authprovider';
import Swal from 'sweetalert2';
import axios from 'axios';
import UpdateUser from '../../Components/UpdateUser';
import useUserdata from '../../hooks/useUserdata';
import { FaEdit } from 'react-icons/fa';
import usePackage from '../../hooks/usePackage';
import useGuide from '../../hooks/useGuide';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const AdminProfile = () => {

  const [isOpen, setIsOpen] = useState(false);
  const { user, setUser } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [packages] = usePackage();
  const [guides] = useGuide();
  const [userData] = useUserdata()

  const { data: stories = [] } = useQuery({
    queryKey: ['story'],
    queryFn: async () => {
      const res = await axiosSecure.get('/stories')
      return res.data;
    }
  })

  const { data: totalPayment = [] } = useQuery({
    queryKey: ['payment'],
    queryFn: async () => {
      const res = await axiosSecure.get('/payment');
      return res.data;
    }
  });
  const totalAmount = totalPayment.reduce((sum, item) => sum + parseFloat(item.price), 0);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Welcome, {userData?.name || 'Admin'}!</h1>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
        <div className="p-4 bg-base-200 rounded shadow">Total Payment: ${totalAmount || 0}</div>
        <div className="p-4 bg-base-200 rounded shadow">Tour Guides: {guides.length || 0}</div>
        <div className="p-4 bg-base-200 rounded shadow">Packages: {packages.length || 0}</div>
        <div className="p-4 bg-base-200 rounded shadow">Clients: {totalPayment.length || 0}</div>
        <div className="p-4 bg-base-200 rounded shadow col-span-2 md:col-span-1">Stories: {stories.length || 0}</div>
      </div>

      <div className="bg-base-100 p-6 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">Admin Information</h2>
        <img src={userData?.image} alt="Admin" className="w-24 h-24 rounded-full mb-2" />
        <p><strong>Name:</strong> {userData?.name}</p>
        <p><strong>Email:</strong> {userData?.email}</p>
        <p><strong>Role:</strong> Admin</p>

        {/* Edit Profile Button & Modal */}
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

    </div>
  );
};


export default AdminProfile;