import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { useQuery } from '@tanstack/react-query'
import useAxiosSecure from '../../hooks/useAxiosSecure';

const ManageCandidates = () => {
  const axiosSecure = useAxiosSecure()
  // const [applications, setApplications] = useState([]);
  

    const { data: applications = [], refetch } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const res = await axiosSecure.get('/guide/application')
      return res.data;
    }
  })

  const handleAccept = async (userId, applicationId) => {
    try {
      // Update role
      await axios.patch(`/api/users/${userId}`, { role: 'tour-guide' });
      // Delete application
      await axios.delete(`/api/applications/${applicationId}`);
      fetchApplications(); // Refresh list
    } catch (err) {
      console.error('Error accepting candidate', err);
    }
  };

  const handleReject = async (applicationId) => {
    try {
      await axios.delete(`/api/applications/${applicationId}`);
      fetchApplications(); // Refresh list
    } catch (err) {
      console.error('Error rejecting candidate', err);
    }
  };

  return (
    <div className="p-6 bg-base-100 rounded shadow">
      <h2 className="text-2xl font-bold mb-6">Manage Candidates</h2>

      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Candidate</th>
              <th>Email</th>
              <th>Role</th>
              <th>Application Title</th>
              <th>Reason</th>
              <th>CV Link</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {applications.length > 0 ? (
              applications?.map((app, index) => (
                <tr key={app._id}>
                  <td>{index + 1}</td>
                  <td>{app.name}</td>
                  <td>{app.email}</td>
                  <td className="capitalize">{app.role || 'user'}</td>
                  <td>{app.title}</td>
                  <td>{app.reason}</td>
                  <td>
                    <a
                      href={app.cvLink}
                      className="text-blue-500 underline"
                      target="_blank"
                      rel="noreferrer"
                    >
                      View CV
                    </a>
                  </td>
                  <td className="flex gap-2">
                    <button
                      className="btn btn-success btn-xs"
                      onClick={() => handleAccept(app.userId, app._id)}
                    >
                      <FaCheckCircle className="mr-1" />
                      Accept
                    </button>
                    <button
                      className="btn btn-error btn-xs"
                      onClick={() => handleReject(app._id)}
                    >
                      <FaTimesCircle className="mr-1" />
                      Reject
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center py-4">
                  No applications found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageCandidates