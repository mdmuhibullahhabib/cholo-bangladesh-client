import { useContext, useState } from "react";
import { AuthContext } from "../Provider/Authprovider";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useRole = () => {
      const [loading, setLoading]= useState(true)
    const axiosSecure = useAxiosSecure();
    const { user } = useContext(AuthContext)
    const { data: isRole, isPending: isRoleLoading } = useQuery({
        queryKey: [user],
        queryFn: async () => {
        setLoading(true)
            const res = await axiosSecure.get(`/users/role/${user.email}`);
            return res.data?.role;
        }
    })
      console.log(isRole)
    return [isRole, isRoleLoading]
};

export default useRole;