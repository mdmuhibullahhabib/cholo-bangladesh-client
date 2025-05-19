import React, { useContext } from 'react';
import { AuthContext } from '../../Provider/Authprovider';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const Joinastourguide = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure()

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const title = form.title.value;
    const motivation = form.motivation.value;
    const cvLink = form.cv.value;

    const application = {
      title,
      motivation,
      cvLink,
      name: user.displayName,
      email: user.email,
      photo: user.photoURL,
      status: "pending",
      submittedAt: new Date(),
    };


    axiosSecure.post('/guide/application', application)
      .then(res => {
                console.log(res.data)
        if (res.data.insertedId) {
          Swal.fire({
            title: 'Application Submitted!',
            text: 'Your application to become a tour guide has been received.',
            icon: 'success',
            confirmButtonText: 'Okay'
          });
          form.reset();
        }
      })
  };

  return (
    <div className="max-w-xl mx-auto bg-base-200 p-6 rounded shadow-md mt-6">
      <h2 className="text-2xl font-semibold mb-4">Join as a Tour Guide</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="title" placeholder="Application Title" className="input input-bordered w-full" required />
        <textarea name="motivation" placeholder="Why do you want to be a tour guide?" className="textarea textarea-bordered w-full h-28" required></textarea>
        <input type="url" name="cv" placeholder="CV Link (Google Drive / PDF)" className="input input-bordered w-full" required />
        <button type="submit" className="btn btn-info w-full">Submit Application</button>
      </form>
    </div>
  );
};

export default Joinastourguide