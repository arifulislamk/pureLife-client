import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { Link } from "react-router-dom";
import { useState } from "react";

const AvailableCamps = () => {
    const [searchText, setSearchText] = useState('')
    // const [camps, setcamps] = useState([]);
    const [sort, setSort] = useState('');
    const axiosPublic = useAxiosPublic();

    const { data: camps = [], isLoading } = useQuery({
        queryKey: ['camps'],
        queryFn: async () => {
            const { data } = await axiosPublic('/camps')
            return data
        }
    })
    console.log(camps, isLoading)
    const handleSearchbtn = e => {
        e.preventDefault();
        // console.log('search ok', searchText)
        // setSearch(searchText)
    }

    if (isLoading || camps.length < 1) return <p> loading</p>
    return (
        <div>
            <Helmet>
                <title>PureLife Health | Available Camps</title>
            </Helmet>
            <h2 className=" text-5xl font-bold text-center mb-14">Available Camps</h2>

            <div className=" flex flex-col md:flex-row md:justify-center items-center md:mb-10 gap-5 lg:gap-20">
                <div>
                    <form onSubmit={handleSearchbtn}>
                        <div className='flex p-1 overflow-hidden border border-gray-500 rounded-lg    focus-within:ring focus-within:ring-opacity-40 focus-within:border-blue-400 focus-within:ring-blue-300'>
                            <input
                                className='px-6 py-2 text-gray-700 placeholder-gray-500 bg-white outline-none focus:placeholder-transparent'
                                type='text'
                                onChange={e => setSearchText(e.target.value)}
                                value={searchText}
                                name='search'
                                placeholder='Enter Camps Name'
                                aria-label='Enter Camps Name'
                            />

                            <button className='px-1 md:px-4 py-3 text-sm font-medium uppercase  btn bg-orange-300 hover:btn-info rounded-md'>
                                Search
                            </button>
                        </div>
                    </form>
                </div>

                <div className=" flex gap-4 items-center md:gap-6 lg:gap-20">
                    <div>
                        <select
                            onChange={e => {
                                setSort(e.target.value)
                                // setCurrentPage(1)
                            }}
                            value={sort}
                            name='sort'
                            id='sort'
                            className='border border-gray-500 p-4 rounded-md'
                        >
                            <option value=''>Sort By Expired Date</option>
                            <option value='dsc'>Descending</option>
                            <option value='asc'>Ascending</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className=" grid grid-cols-2 gap-5">
                {
                    camps.length > 0 && camps.map((camp) =>
                        <Link key={camp._id} to={`/camps/${camp._id}`} >
                            <div className="p-8 bg-base-100 shadow-xl rounded-3xl" >
                                <div className="flex gap-3 ">
                                    <div className=" w-4/5 ">
                                        <img className=" w-full rounded-lg" src={camp.image} alt="Album" />
                                    </div>
                                    <div className=" ">
                                        <p>Location: {camp.location}</p>
                                        <p>Fees: {camp.campFees}</p>
                                        <p>Date: {camp.dateAndTime}</p>
                                        <p>Participant : {camp.participantCount}</p>
                                        <div className=" mt-14">
                                            <h2 className="card-title mb-5">{camp.campName}</h2>
                                            <p>{camp.healthcareProfessional}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    )
                }
            </div>

        </div>
    );
};

export default AvailableCamps;