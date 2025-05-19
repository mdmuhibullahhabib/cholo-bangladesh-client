import { loadCaptchaEnginge, LoadCanvasTemplate, LoadCanvasTemplateNoReload, validateCaptcha } from 'react-simple-captcha';
import React, { useEffect, useRef } from 'react'
import { useContext, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import { AuthContext } from '../Provider/Authprovider';
import Swal from 'sweetalert2';
import SocialLogin from './SocialLogin';

const Login = () => {
  //   const { login, googleLogin, resetPassword } = useContext(AuthContext);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const { signIn, setUser } = useContext(AuthContext);

  const captchaRef = useRef(null)
  const [disable, setDisable] = useState(true);

  useEffect(() => {
    loadCaptchaEnginge(6);
  })

  const handleCaptcha = () => {
    const value = captchaRef.current.value

    if (validateCaptcha(value)) {
      setDisable(false)
    }
    else {
      setDisable(true)
    }
  }

  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    signIn(email, password)
      .then(result => {
        const user = result.user;
        setUser(user)
        navigate(location?.state ? location.state : "/")
        Swal.fire({
          title: "Login Successfully!",
          icon: "success",
            showConfirmButton: false,
            timer: 1500
        });
      })
      .catch((err) => {
        Swal.fire({
          title: 'Error!',
          text: 'please try again with valid email & password',
          icon: 'error',
          draggable: true
        })
      });

  };


  const handleReset = () => {
    const email = prompt("Enter your email to reset password:");
    if (email) {
      resetPassword(email)
        .then(() => alert("Check your email for reset link"))
        .catch(err => alert("Failed to send reset email"));
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-base-200 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-4">Login</h2>
      <form onSubmit={handleLogin} className="space-y-4">
        <input type="email" name="email" placeholder="Email" className="input input-bordered w-full" required />
        <input type="password" name="password" placeholder="Password" className="input input-bordered w-full" required />
        <div>
          <label>
            <LoadCanvasTemplate />
          </label>
          {/* <input type="text" ref={captchaRef} name="captcha" placeholder="Type the captcha above" className="input input-bordered w-full" required />
          <button onClick={handleCaptcha} className="mt-2 btn btn-outline btn-xs">
            Validate
          </button> */}
        </div>
        {/* disabled={disable} */}
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button className="btn btn-primary w-full">Login</button>
        <button type="button" onClick={handleReset} className="text-sm text-blue-500 underline">
          Forgot Password?
        </button>
      </form>
      <div className="divider">OR</div>
    <SocialLogin></SocialLogin>
    </div>
  );
};

export default Login;