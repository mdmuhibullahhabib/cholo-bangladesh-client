import React, { useContext } from 'react';
import { AuthContext } from '../../Provider/Authprovider';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useForm } from "react-hook-form";
import useAxiosPublic from '../../hooks/useAxiosPublic';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddStories = () => {
  const { user } = useContext(AuthContext);
  const { register, handleSubmit, reset } = useForm();
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    console.log(data)
    // image upload to imgbb and then get an url
    const imageFile = { image: data.image[0] }
    const res = await axiosPublic.post(image_hosting_api, imageFile, {
      headers: {
        'content-type': 'multipart/form-data'
      }
    });
    if (res.data.success) {

      const storyData = {
        title: data.title,
        description: data.description,
        email: user.email,
        name: user.displayName,
        userPhoto: user.photoURL,
        createdAt: new Date(),
        image: res.data.data.display_url,
      };

      const storyRes = await axiosSecure.post('/story', storyData);
      if (storyRes.data.insertedId) {
        reset();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${user.displayName} your application submit successful.`,
          showConfirmButton: false,
          timer: 1500
        });
      }
    }
    console.log('with image url', res.data);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-base-200 rounded">
      <h2 className="text-xl font-bold mb-4">Add Your Story</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input type="text"
          {...register('title', { required: true })}
          placeholder="Title" className="input input-bordered w-full" required />
        <textarea
          {...register('description', { required: true })}
          placeholder="Your Story" className="textarea textarea-bordered w-full h-32" required></textarea>
        <input type="file"
          {...register('image', { required: true })}
          multiple accept="image/*" className="file-input file-input-bordered w-full" />
        <button type="submit" className="btn btn-primary w-full">Submit Story</button>
      </form>
    </div>
  )
}

export default AddStories;