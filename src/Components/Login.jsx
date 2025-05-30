import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';
import React, { useEffect } from 'react'
import { useContext, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from '../Provider/Authprovider';
import Swal from 'sweetalert2';
import SocialLogin from './SocialLogin';

const Login = () => {
  //   const { login, googleLogin, resetPassword } = useContext(AuthContext);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const { signIn } = useContext(AuthContext);

  const [disable, setDisable] = useState(true);

  useEffect(() => {
    loadCaptchaEnginge(6);
  },[])

  const handleValidateCaptcha = (e) => {
   const user_captcha_value = e.target.value;
        if (validateCaptcha(user_captcha_value)) {
            setDisable(false);
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
        .then(() => {
        })
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
          {/* <input type="text" ref={captchaRef} name="captcha" placeholder="Type the captcha above" className="input input-bordered w-full" required /> */}
          <input onBlur={handleValidateCaptcha} type="text" name="captcha" placeholder="type the captcha above" className="input input-bordered" />

        </div>
       
        <button  disabled={disable}  className="btn btn-primary w-full">Login</button>
        <button type="button" onClick={handleReset} className="text-sm text-blue-500 underline">
          Forgot Password?
        </button>
                  <p className="text-sm mt-2 text-center" >Dont’t Have An Account ? <Link to="/auth/register" className='text-red-500'>Register</Link></p>
      </form>
      <div className="divider">OR</div>

     <SocialLogin ></SocialLogin>

    </div>
  );
};

export default Login;