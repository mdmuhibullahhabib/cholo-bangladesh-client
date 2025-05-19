import React, { useContext } from 'react';
import Swal from 'sweetalert2';
import useAxiosSecure from '../hooks/useAxiosSecure';
import { AuthContext } from '../Provider/Authprovider';
import { useQuery } from "@tanstack/react-query";
import useUserdata from '../hooks/useUserdata';


const UpdateUser = ({ isOpen, setIsOpen, setUser }) => {
    const axiosSecure = useAxiosSecure()

    const [userData, refetch] = useUserdata()

    const handleUpdate = (e) => {
        e.preventDefault();

        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const role = form.role.value;
        const image = form.photo.value;
        const updateUser = { name, email, image, role }

        Swal.fire({
            title: "Are you sure?",
            text: "You are about to update your profile",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Update!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.put(`/users/${userData._id}`, updateUser)
                    .then(res => {
                        if (res.data.modifiedCount > 0) {
                            Swal.fire('Success', 'Your profile was updated successfully.', 'success');
                            setUser(updateUser)
                            refetch();
                            setIsOpen(false);
                        }
                    })
            }
        });
    }

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded shadow w-96 relative">
                <h2 className="text-xl font-bold mb-4">Edit Profile</h2>
                <form onSubmit={handleUpdate} className="space-y-4">

                    <div className="">
                        <label className="block font-medium mb-1">Name</label>
                        <input
                            type="text"
                            name="name"
                            defaultValue={userData.name}
                            className="input input-bordered w-full"
                            placeholder="Name"
                            required
                        />
                    </div>

                    <div className="">
                        <label className="block font-medium mb-1">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={userData?.email}
                            disabled
                            className="input input-bordered w-full bg-gray-100"
                        />
                    </div>

                    <div className="">
                        <label className="block font-medium mb-1">Photo</label>
                        <input
                            type="text"
                            name="photo"
                            defaultValue={userData.image}
                            className="input input-bordered w-full"
                            placeholder="Photo URL"
                        />
                    </div>

                    <div className="">
                        <label className="block font-medium mb-1">Role</label>
                        <input
                            type="text"
                            name="role"
                            value={userData?.role || "Tourist"}
                            disabled
                            className="input input-bordered w-full bg-gray-100"
                        />
                    </div>
                    <div className="flex justify-between">
                        <button type="submit" className="btn btn-success">Save</button>
                        <button type="button" className="btn btn-outline" onClick={() => setIsOpen(false)}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateUser;
