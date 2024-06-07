import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";
import useAuth from "./useAuth";

const useOrganizer = () => {
    const { user, loading } = useAuth()
    const axiosPublic = useAxiosPublic()

    const { data: role, isLoading } = useQuery({
        enabled: !!user?.email || !loading,
        queryKey: ['role'],
        queryFn: async () => {
            const { data } = await axiosPublic(`user/${user?.email}`)
            return data.role
        }
    })
    console.log(role)
    return [role, isLoading]
};

export default useOrganizer;