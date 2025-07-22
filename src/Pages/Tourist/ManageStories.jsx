import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../Provider/Authprovider';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from "@tanstack/react-query";
import { FaTrashAlt, FaEdit, FaPlus } from "react-icons/fa";

const ManageStories = () => {

    const axiosSecure = useAxiosSecure()
  const { user } = useContext(AuthContext);

    const { data: stories = [], refetch } = useQuery({
    queryKey: ['story'],
    queryFn: async () => {
      const res = await axiosSecure.get(`/story?email=${user.email}`)
      return res.data;
    }
  })
  console.log(stories)
  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You want to Delete this Stories?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/story/${id}`)
          .then(() => {
            refetch()
            Swal.fire('Deleted!', 'Your story has been deleted.', 'success');
          });
      }
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
 
            {stories.map(story => (
        <div key={story._id} className="card bg-base-200 shadow-md">
          <div className="card-body">
            <h2 className="card-title">{story.title}</h2>
            <p>{story.text}</p>

             <div className="flex flex-wrap gap-2 my-3">
              <img  src={story.image} alt="story" className="w-20 h-20 object-cover rounded" />
          </div>

            <div className="card-actions justify-between mt-4">
              <Link to={`/dashboard/update-story/${story._id}`} className="btn btn-sm btn-info">
                <FaEdit className="mr-1" /> Edit
              </Link>
              <button
                onClick={() => handleDelete(story._id)}
                className="btn btn-sm btn-error"
              >
                <FaTrashAlt className="mr-1" /> Delete
              </button>
            </div>
          </div>
        </div>
      ))}
  
    </div>
  );
};


export default ManageStories