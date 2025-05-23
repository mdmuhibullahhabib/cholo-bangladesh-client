import axios from 'axios'
import React from 'react'

 const axiosPublic = axios.create({
    baseURL: 'https://tourism-management-server-liard-zeta.vercel.app'
})

const useAxiosPublic = () => {
  return axiosPublic
}

export default useAxiosPublic;