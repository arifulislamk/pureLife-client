
import Doctors from '../../components/Doctors/Doctors';
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import LoadingSpiner from '../../components/Shared/LoadingSpiner';
import { Helmet } from 'react-helmet-async';

const OurDoctor = () => {
    const axiosPublic = useAxiosPublic()
    const { data: doctors, isLoading } = useQuery({
        queryKey: ['doctors'],
        queryFn: async () => {
            const { data } = await axiosPublic('/doctors')
            return data
        }
    })
    if (isLoading) return <LoadingSpiner />
    return (
        <div>
            <Helmet>
                <title>PureLife Health | Doctors</title>
            </Helmet>
            <div className=" mt-2 md:mt-6 py-4 md:py-8 bg-[#13131326] text-center rounded-lg font-work">
                <h2 className=" font-bold text-xl md:text-3xl ">Most Popular Doctors</h2>
            </div>
            <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4 font-work">
                {
                    doctors.map((doctor, inx) => <Doctors key={inx} doctor={doctor}> </Doctors>)
                }
            </div>

        </div>
    );
};

export default OurDoctor;