import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import LoadingSpiner from '../Shared/LoadingSpiner';

const DoctorHomeSection = () => {
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
            <div className=" text-center md:mt-40 mb-14">
                <h2 className=" font-extrabold text-xl md:text-5xl lg:mb-14 ">Our Popular Doctors</h2>
            </div>
            <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-4 font-work">
                {
                    doctors.map((doctor, inx) => <div key={inx} className=" p-2 md:p-6 space-y-6 bg-[#1313130D]  rounded-2xl">
                        <div className="flex justify-center items-center"><img className="w-1/2 h-40 border rounded-lg" src={doctor.imageurl} alt="" /></div>
                        <h2 className="text-xl text-dark-300 ">Specialty: {doctor.specialty}</h2>
                        <h2 className=" font-medium text-xl">Doctor Name : {doctor.name}</h2>
                        <h2 className=" font-medium text-xl">country : {doctor.country}</h2>
                        <p>{doctor.information}</p>

                    </div>)
                }
            </div>

        </div>
    );
};

export default DoctorHomeSection;