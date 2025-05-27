import axios from 'axios'
import React from 'react'

 const axiosPublic = axios.create({
    baseURL: 'https://tourism-management-server-5ts035kx5-muhibullah-habibs-projects.vercel.app'
})

const useAxiosPublic = () => {
  return axiosPublic
}

export default useAxiosPublic;