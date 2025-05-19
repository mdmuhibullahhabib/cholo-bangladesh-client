import React, { useContext } from 'react'
import {
    useQuery,
} from '@tanstack/react-query'
import useAxiosSecure from './useAxiosSecure'
import { AuthContext } from '../Provider/Authprovider'


const useBooked = () => {

    const {user} = useContext(AuthContext)
    const axiosSecure = useAxiosSecure()
    const { refetch, data: bookings = [] } = useQuery({
        queryKey: ['booked'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/booked?email=${user.email}`)
            return res.data;
        }
    })
    return [bookings, refetch]
}

export default useBooked;