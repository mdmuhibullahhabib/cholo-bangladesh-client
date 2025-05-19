import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Provider/Authprovider';
import Swal from 'sweetalert2';
import axios from 'axios';
import UpdateUser from '../../Components/UpdateUser';
import useUserdata from '../../hooks/useUserdata';
import { FaEdit } from 'react-icons/fa';

const AdminProfile = () => {
  const [userData] = useUserdata()
  const [isOpen, setIsOpen] = useState(false);
  const { user, setUser } = useContext(AuthContext);
  const [stats, setStats] = useState({
    totalPayment: 0,
    totalGuides: 0,
    totalPackages: 0,
    totalClients: 0,
    totalStories: 0,
  });

  useEffect(() => {
    // Replace with your backend API endpoints
    const fetchStats = async () => {
      const [paymentRes, guideRes, packageRes, clientRes, storyRes] = await Promise.all([
        axios.get('/api/payments/total'),
        axios.get('/api/users/count?role=guide'),
        axios.get('/api/packages/count'),
        axios.get('/api/users/count?role=tourist'),
        axios.get('/api/stories/count')
      ]);

      setStats({
        totalPayment: paymentRes.data.total || 0,
        totalGuides: guideRes.data.count || 0,
        totalPackages: packageRes.data.count || 0,
        totalClients: clientRes.data.count || 0,
        totalStories: storyRes.data.count || 0,
      });
    };

    fetchStats();
  }, []);



  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Welcome, {userData?.name || 'Admin'}!</h1>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
        <div className="p-4 bg-base-200 rounded shadow">Total Payment: ${stats.totalPayment}</div>
        <div className="p-4 bg-base-200 rounded shadow">Tour Guides: {stats.totalGuides}</div>
        <div className="p-4 bg-base-200 rounded shadow">Packages: {stats.totalPackages}</div>
        <div className="p-4 bg-base-200 rounded shadow">Clients: {stats.totalClients}</div>
        <div className="p-4 bg-base-200 rounded shadow col-span-2 md:col-span-1">Stories: {stats.totalStories}</div>
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