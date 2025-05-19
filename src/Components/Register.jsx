import React from 'react'
import { useContext, useState } from "react";
// import { AuthContext } from "../providers/AuthProvider";
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../Provider/Authprovider';
import Swal from 'sweetalert2';
import useAxiosPublic from '../hooks/useAxiosPublic';


const Register = () => {
  //   const { register } = useContext(AuthContext);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic()

  const { user, signUp, setUser, updateUserProfile } = useContext(AuthContext);


  const handleRegister = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const image = form.image.value;
    const password = form.password.value;

    const userData = { name, email, image }
    console.log(user, userData)
    setError('');
    if (password.length < 5) {
      setError("Must be more the 5 character long");
      return;
    }
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    if (!passwordRegex.test(password)) {
      setError("Password must have at least one uppercase letter, one lowercase letter, and be at least 6 characters long.")
      return;
    }
    signUp(email, password)
      .then((result) => {
        const user = result.user;
        updateUserProfile({ displayName: name, photoURL: image })
          .then(() => {
            axiosPublic.post('/users', userData)
              .then(res => {
                if (res.data.insertedId) {
                  console.log('add to database', res.data)
                  setUser({ ...user, displayName: name, photoURL: image });
                  navigate("/");
                  Swal.fire({
                    title: "Registration Successfully!",
                    icon: "success",
                    draggable: true
                  });
                }
              })
          })
          .catch((error) => {
            console.log(error);
            setUser(user);
          });
      })
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-base-200 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-4">Register</h2>
      <form onSubmit={handleRegister} className="space-y-4">
        <input type="text" name="name" placeholder="Full Name" className="input input-bordered w-full" required />
        <input type="email" name="email" placeholder="Email" className="input input-bordered w-full" required />
        <input type="text" name="image" placeholder="Photo URL" className="input input-bordered w-full" required />
        <input type="password" name="password" placeholder="Password" className="input input-bordered w-full" required />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button className="btn btn-primary w-full">Register</button>
      </form>
    </div>
  );
};

export default Register