import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import { AuthContext } from '../../Provider/Authprovider';
import useBooked from '../../hooks/useBooked';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const MyBooking = () => {

    const axiosSecure = useAxiosSecure()
    // const [bookings, setBookings] = useState([]);
    const [bookings, refetch] = useBooked()

    const handleCancel = id => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You want to cancel this booking?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, cancel it!',
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/booked/${id}`)
                    .then(res => {
                        refetch()
                        console.log(res)
                        if (res.data.deletedCount > 0) {
                            Swal.fire('Cancelled!', 'Your booking has been cancelled.', 'success');
                        }
                    });
            }
        });
    };

    return (
        <div className="overflow-x-auto">
            <h2 className="text-2xl font-bold mb-4">My Bookings</h2>
            <table className="table table-zebra w-full">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Package</th>
                        <th>Tour Guide</th>
                        <th>Date</th>
                        <th>Price</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {bookings?.map((booking, index) => (
                        <tr key={booking._id}>
                            <td>{index + 1}</td>
                            <td>{booking.packageName}</td>
                            <td>{booking.guideName}</td>
                            <td>{booking.tourDate}</td>
                            <td>${booking.price}</td>
                            <td className="capitalize">{booking.status}</td>
                            <td className="space-x-2">
                                {booking.status === 'pending' && (
                                    <>
                                        <Link to={`/dashboard/payment/${booking._id}`}>
                                            <button className="btn px-5 mb-1 btn-sm btn-success">Pay</button>
                                        </Link>
                                        <button
                                            onClick={() => handleCancel(booking._id)}
                                            className="btn btn-sm btn-error"
                                        >
                                            Cancel
                                        </button>
                                    </>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};


export default MyBooking