
import { useQuery } from "@tanstack/react-query";
// import useAxiosSecure from "./useAxiosSecure";
import useAxiosPublic from "./useAxiosPublic";

const useGuide =() => {
    // const axiosSecure = useAxiosSecure();
    const axiosPublic = useAxiosPublic();
    const {data: guides = [], refetch} = useQuery({
        queryKey: ['guides'],
        queryFn: async() =>{
            const res = await axiosPublic.get('/users/guides');
            console.log('Guide', res.data)
            return res.data;
        }
    })
    console.log(guides)
    return [guides, refetch]
};

export default useGuide;