import React, { useState } from 'react';
import Select from 'react-select';
import { FaSearch, FaTrashAlt, FaUsers } from 'react-icons/fa';
import { useQuery } from '@tanstack/react-query'
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const roleOptions = [
  { value: '', label: 'All Roles' },
  { value: 'user', label: 'User' },
  { value: 'tourist', label: 'Tourist' },
  { value: 'guide', label: 'Tour Guide' },
  { value: 'admin', label: 'Admin' },
];

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure()
  const [search, setSearch] = useState('');
  const [selectedRole, setSelectedRole] = useState(roleOptions[0]);

  const { data: users = [], refetch } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const res = await axiosSecure.get('/users')
      return res.data;
    }
  })

  const handleRole = (user, newRole) => {
    Swal.fire({
      title: "Are you sure?",
      text: `Can you make ${ newRole } ${user.name}!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: `Yes, make ${ newRole }!`
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.patch(`/users/role/${user._id}`, { role: newRole })
          .then(res => {
            refetch();
            if (res.data.modifiedCound > 0) {
              Swal.fire('Success', `${user.name} is now a ${newRole}.`, 'success');
            }
          })
      }
    });
  }

  const handleDeleteUser = user => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You want to delete this User?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/users/${user._id}`)
          .then(res => {
            refetch()
            console.log(res)
            if (res.data.deletedCount > 0) {
              Swal.fire('Deleted!', 'Your User has been Delete.', 'success');
            }
          });
      }
    });
  }

  return (
    <div className="p-6 bg-base-100 rounded shadow">
      <h2 className="text-2xl font-bold mb-6">Manage Users</h2>

      {/* Filter & Search */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div className="flex items-center gap-2">
          <FaSearch />
          <input
            type="text"
            placeholder="Search by name or email"
            className="input input-bordered w-64"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="w-60">
          <Select
            options={roleOptions}
            value={selectedRole}
            onChange={(option) => setSelectedRole(option)}
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Photo</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.length ? (
              users.map((user, index) => (
                <tr key={user._id}>
                  <td>{index + 1}</td>
                  <td>
                    <img
                      src={user.photoURL || 'https://via.placeholder.com/40'}
                      alt="User"
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  </td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td className="capitalize">
                    {
                      user.role === 'admin' ? (
                        'Admin'
                      ) : user.role === 'guide' ? (
                        <button className="btn btn-lg">Guide</button>
                      ) : (
                        <select
                          value={user.role}
                          onChange={(e) => handleRole(user, e.target.value)}
                          className="select "
                        >
                          <option value="tourist">Tourist</option>
                          <option value="guide">Guide</option>
                          <option value="admin">Admin</option>
                        </select>
                      )
                    }
                  </td>
                  {/* <select
              value={selectedGuide}
              onChange={(e) => setSelectedGuide(e.target.value)}
              className="select select-bordered w-full"
            >
              {guides?.map((guide, i) => (
                <option key={i} value={guide}>{guide}</option>
              ))}
            </select> */}

                  {/* <button onClick={() => handleMakeRole(user)} className='btn btn-lg'>
                            <FaUsers className='text-2xl'></FaUsers> {user.role}
                          </button> */}
                  <td>
                    <button onClick={() => handleDeleteUser(user)} className='btn btn-ghost btn-lg'>
                      <FaTrashAlt className='text-red-600'></FaTrashAlt>
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-4">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};


export default ManageUsers;