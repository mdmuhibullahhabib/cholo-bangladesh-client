import React from "react";
import { createBrowserRouter } from 'react-router-dom'
import HomeLayout from "../Layouts/HomeLayout";
import Login from "../Components/Login";
import Register from "../Components/Register";
import AuthLayout from "../Layouts/AuthLayout";
import Home from "../Pages/Home";
import Community from "../Pages/Community";
import AboutUs from "../Pages/AboutUs";
import Trips from "../Pages/Trips";
import PackageDetails from "../Pages/PackageDetails";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../Layouts/Dashboard";
import Joinastourguide from "../Pages/Tourist/Joinastourguide";
import MyBooking from "../Pages/Tourist/MyBooking";
import Profile from "../Pages/Tourist/Profile";
import AddStories from "../Pages/Tourist/AddStories";
import ManageStories from "../Pages/Tourist/ManageStories";
import AdminProfile from "../Pages/Admin/AdminProfile";
import ManageCandidates from "../Pages/Admin/ManageCandidates";
import AddPackage from "../Pages/Admin/AddPackage";
import ManageUsers from "../Pages/Admin/ManageUsers";
import GuideProfile from "../Pages/Guide/GuideProfile";
import AssignedTours from "../Pages/Guide/AssignedTours";
import Payment from "../Pages/Tourist/Payment";

const Router = createBrowserRouter([
    {
        path: "/",
        element: <HomeLayout></HomeLayout>,
        children: [
            {
                path: "/",
                element: <Home></Home>,
            },
            {
                path: "/community",
                element: <Community></Community>,
            },
            {
                path: "/about",
                element: <AboutUs></AboutUs>,
            },
            {
                path: "/trips",
                element: <Trips></Trips>
            },
            {
                path: "/package/:_id",
                element: <PrivateRoute><PackageDetails></PackageDetails></PrivateRoute>,
                loader: ({ params }) => fetch(`https://tourism-management-server-liard-zeta.vercel.app/package/${params._id}`),
            }
        ],
    },

    {
        path: "/auth",
        element: <AuthLayout></AuthLayout>,
        children: [
            {
                path: "/auth/login",
                element: <Login></Login>,
            },
            {
                path: "/auth/register",
                element: <Register></Register>,
            }
        ]
    },
    {
        path: "/dashboard",
        element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
        children: [
            // tourist
            {
                path: '/dashboard/profile',
                element: <Profile></Profile>,
            },
            {
                path: '/dashboard/bookings',
                element: <MyBooking></MyBooking>
            },
            {
                path: '/dashboard/payment',
                element: <Payment></Payment>
            },
            {
                path: '/dashboard/add-story',
                element: <AddStories></AddStories>
            },
            {
                path: '/dashboard/manage-stories',
                element: <ManageStories></ManageStories>
            },
            {
                path: '/dashboard/join-guide',
                element: <Joinastourguide></Joinastourguide>
            },

            // Admin
            {
                path: '/dashboard/admin-profile',
                element: <AdminProfile></AdminProfile>
            },
            {
                path: '/dashboard/manage-candidates',
                element: <ManageCandidates></ManageCandidates>
            },
            {
                path: '/dashboard/add-package',
                element: <AddPackage></AddPackage>

            },
            {
                path: '/dashboard/manage-users',
                element: <ManageUsers></ManageUsers>
            },

            // Guide
            {
                path: '/dashboard/guide-profile',
                element: <GuideProfile></GuideProfile>
            },
            {
                path: '/dashboard/assigned-tours',
                element: <AssignedTours></AssignedTours>
            },
        ]
    },
    {
        path: "*",
        element: <h2>this is error</h2>
    },
])

export default Router
