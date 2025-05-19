import React, { useContext } from "react";
import { FcGoogle } from "react-icons/fc";
// import { AuthContext } from "../Provider/Authprovider";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { AuthContext } from "../Provider/Authprovider";

const SocialLogin = () => {

    const { signInWithGoogle } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation()
    const axiosPublic = useAxiosPublic()

    const handleGoogleSignIn = () => {
        signInWithGoogle()
            .then(result => {
                const user = result.user
                const userInfo = {
                    email: user?.email,
                    name: user?.displayName,
                    image: user?.photoURL,
                }
                axiosPublic.post('/users', userInfo)
                    .then(res => {
                        // Swal.fire({
                        //     icon: "success",
                        //     title: "Logged in with Google",
                        //     text: `Welcome, ${userInfo.name}!`,
                        // });
                        console.log(res.data)
                        navigate(location?.state ? location.state : "/")
                    })
            })
    };

    return (
        <div className="text-center mt-4">
            <button
                onClick={handleGoogleSignIn}
                className="btn btn-outline btn-wide flex items-center justify-center gap-2"
            >
                <FcGoogle className="text-2xl" />
                Sign in with Google
            </button>
        </div>
    )
}

export default SocialLogin