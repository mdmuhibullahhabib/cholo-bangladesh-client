import React, { useContext } from 'react'
import { AuthContext } from '../Provider/Authprovider'
import { Navigate, useLocation } from 'react-router-dom';
import useRole from '../hooks/useRole';

const AdminRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation()
    const [isRole, isRoleLoading] = useRole();

    if (loading || isRoleLoading) {
        return <h2>loading</h2>
    }
    if (user && isRole === 'admin') {
        return children;
    }
    return <Navigate state={location.pathname} to={"/auth/login"}></Navigate>
}

export default AdminRoute;