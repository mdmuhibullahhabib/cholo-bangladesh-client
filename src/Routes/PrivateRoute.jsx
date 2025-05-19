import React, { useContext } from 'react'
import { AuthContext } from '../Provider/Authprovider'
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const { user, loading} = useContext(AuthContext);
    const location = useLocation()
    if(loading){
        return (
            <div className="text-center mt-10"> <span className="loading loading-dots loading-md"></span>
<span className="loading loading-dots loading-lg"></span>
<span className="loading loading-dots loading-xl"></span></div>
)
    }
    if (user) {
        return children;
    }
    return <Navigate state={location.pathname} to={"/auth/login"}></Navigate>
}

export default PrivateRoute