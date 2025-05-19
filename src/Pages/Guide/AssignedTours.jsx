import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

const AssignedTours = () => {
  const [assignedTours, setAssignedTours] = useState([]);

  // Fetch assigned tours (adjust API endpoint)
  useEffect(() => {
    fetch('/assigned-tours') // Replace with your actual API route
      .then(res => res.json())
      .then(data => setAssignedTours(data));
  }, []);

  const handleAccept = (id) => {
    fetch(`/assigned-tours/accept/${id}`, {
      method: 'PATCH',
    })
      .then(res => res.json())
      .then(data => {
        if (data.modifiedCount > 0) {
          Swal.fire('Accepted!', 'The tour has been accepted.', 'success');
          updateStatus(id, 'Accepted');
        }
      });
  };

  const handleReject = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to reject this tour?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, reject it!',
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`/api/assigned-tours/reject/${id}`, {
          method: 'PATCH',
        })
          .then(res => res.json())
          .then(data => {
            if (data.modifiedCount > 0) {
              Swal.fire('Rejected!', 'The tour has been rejected.', 'success');
              updateStatus(id, 'Rejected');
            }
          });
      }
    });
  };

  const updateStatus = (id, newStatus) => {
    setAssignedTours(prev =>
      prev.map(tour => tour._id === id ? { ...tour, status: newStatus } : tour)
    );
  };

  return (
    <div className="overflow-x-auto p-4">
      <h2 className="text-2xl font-bold mb-4">My Assigned Tours</h2>
      {assignedTours.length > 0 ? (
        <table className="table w-full">
          <thead>
            <tr>
              <th>Package Name</th>
              <th>Tourist Name</th>
              <th>Tour Date</th>
              <th>Price</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {assignedTours.map(tour => (
              <tr key={tour._id}>
                <td>{tour.packageName}</td>
                <td>{tour.touristName}</td>
                <td>{new Date(tour.tourDate).toLocaleDateString()}</td>
                <td>${tour.price}</td>
                <td>
                  <span
                    className={`badge ${
                      tour.status === 'Accepted'
                        ? 'badge-success'
                        : tour.status === 'Rejected'
                        ? 'badge-error'
                        : 'badge-warning'
                    }`}
                  >
                    {tour.status}
                  </span>
                </td>
                <td className="flex gap-2">
                  <button
                    className="btn btn-success btn-sm"
                    disabled={tour.status !== 'In Review'}
                    onClick={() => handleAccept(tour._id)}
                  >
                    Accept
                  </button>
                  {tour.status === 'In Review' && (
                    <button
                      className="btn btn-error btn-sm"
                      onClick={() => handleReject(tour._id)}
                    >
                      Reject
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No assigned tours available.</p>
      )}
    </div>
  );
};

export default AssignedTours