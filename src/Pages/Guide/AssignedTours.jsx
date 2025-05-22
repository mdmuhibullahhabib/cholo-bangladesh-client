import React from 'react';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { AuthContext } from '../../Provider/Authprovider';
import { useContext } from 'react';

const AssignedTours = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);

  // Fetch assigned tours for the logged-in guide
  const { data: assignedTours = [], refetch } = useQuery({
    queryKey: ['assignedTours', user?.displayName],
    queryFn: async () => {
      const res = await axiosSecure.get(`/assigned-tours/${user?.displayName}`);
      return res.data;
    }
  });

    // Accept tour by menuId
  const handleAccept = async (menuId) => {
      const res = await axiosSecure.patch(`/assigned-tours/accept-by-menu/${menuId}`);
      if (res.data.bookingResult.modifiedCount > 0) {
        Swal.fire('Success!', 'Tour accepted successfully', 'success');
        refetch();
      } 
  };

    // Reject tour by menuId
  const handleReject = async (menuId) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'Do you really want to reject this tour?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, reject it!',
      cancelButtonText: 'Cancel',
    });

    if (result.isConfirmed) {
        const res = await axiosSecure.patch(`/assigned-tours/reject-by-menu/${menuId}`);
        if (res.data.bookingResult.modifiedCount > 0) {
          Swal.fire('Rejected!', 'Tour has been rejected.', 'success');
          refetch();
        } 
    }
  };
  return (
    <div className="overflow-x-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">My Assigned Tours</h2>
      <table className="table w-full bg-base-200">
        <thead>
          <tr>
            <th>#</th>
            <th>Package Name</th>
            <th>Tourist Name</th>
            <th>Tour Date</th>
            <th>Price</th>
            <th>Status</th>
            <th className="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {assignedTours.map((tour, index) => (
            <tr key={tour._id}>
              <td>{index + 1}</td>
              <td>{tour.packageName}</td>
              <td>{tour.name}</td>
              <td>{tour.tourDate}</td>
              <td>${tour.price}</td>
              <td className="capitalize">{tour.status}</td>

                   <td className="flex gap-2">
                <button
                  className="btn btn-success btn-sm"
                  onClick={() => handleAccept(tour.menuId)}
                  disabled={tour.status !== 'in-review'}
                >
                  Accept
                </button>
                <button
                  className="btn btn-error btn-sm"
                  onClick={() => handleReject(tour.menuId)}
                  disabled={tour.status !== 'in-review'}
                >
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AssignedTours;