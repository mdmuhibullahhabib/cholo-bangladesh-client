import React from 'react';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { useQuery } from '@tanstack/react-query'
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const ManageCandidates = () => {
  const axiosSecure = useAxiosSecure()
  const { data: applications = [], refetch } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const res = await axiosSecure.get('/guide/application')
      return res.data;
    }
  })

  const handleAccept = (app) => {
    console.log(app)
    Swal.fire({
      title: "Are you sure?",
      text: `Can you make guide this user!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: `Yes, make Guide!`
    }).then((result) => {
      if (result.isConfirmed) {
          axiosSecure.patch(`/users/guide/${app.applyId}`, { role: 'guide' })
          .then(res => {
            axiosSecure.delete(`/guide/application/${app._id}`)
            refetch();
            if (res.data.modifiedCound > 0) {
              Swal.fire('Success', `Succesfully add to guide.`, 'success');
            }
          })
      }
    }); 
  };

  const handleReject = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You want to Reject this User?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Reject it!',
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/guide/application/${id}`)
          .then(res => {
            refetch()
            console.log(res)
            if (res.data.deletedCount > 0) {
              Swal.fire('Rejected!', 'Your User has been Delete.', 'success');
            }
          });
      }
    });
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
                      onClick={() => handleAccept(app)}
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