import axios from "axios";
// import useAuth from "./useAuth";
// import { useNavigate } from "react-router-dom";
// import { useEffect } from "react";

export const axiosSecure = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
})
const useAxiosSecure = () => {
    // const { logOut } = useAuth()
    // const navigate = useNavigate()

    // useEffect(() => {
    //     axiosSecure.interceptors.response.use(
    //         res => {
    //             return res
    //         },
    //         async error => {
    //             console.log('errror in the inceptors', error.response)
    //             if (error.response.status === 401 || error.response.status === 403) {
    //                 await logOut()
    //                 navigate('/login')
    //             }
    //             return Promise.reject(error)
    //         }
    //     )
    // }, [logOut, navigate])
    return axiosSecure
};

export default useAxiosSecure;