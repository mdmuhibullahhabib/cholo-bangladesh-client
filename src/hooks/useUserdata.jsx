import React from 'react'
import { useContext } from "react";
import { AuthContext } from "../Provider/Authprovider";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useUserdata = () => {

    const axiosSecure = useAxiosSecure();
    const { user } = useContext(AuthContext)

    const { data: userData = [], refetch } = useQuery({
        queryKey: ['user'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/user?email=${user.email}`)
            return res.data;
        }
    })
    return [userData, refetch]
};


export default useUserdata