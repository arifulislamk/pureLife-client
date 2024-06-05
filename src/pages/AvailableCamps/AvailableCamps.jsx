import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { Link } from "react-router-dom";
import { useState } from "react";
import { BsLayoutThreeColumns } from "react-icons/bs";
import { LuColumns } from "react-icons/lu";

const AvailableCamps = () => {
    const [search, setSearch] = useState('')
    const [searchText, setSearchText] = useState('')
    const [date, setdate] = useState('');
    const [participant, setParticipant] = useState('');
    const axiosPublic = useAxiosPublic();
    const [toggle, setToggle] = useState(true)


    const { data: camps = [], isLoading } = useQuery({
        queryKey: ['camps', date, search, participant],
        queryFn: async () => {
            const { data } = await axiosPublic(`/camps?search=${search}&date=${date}&participant=${participant}`)
            return data
        }
    })
    // console.log(camps, isLoading)
    const handleSearchbtn = e => {
        e.preventDefault();
        console.log('search ok click', searchText)
        setSearch(searchText)
    }
    const [layout, setlayout] = useState('');
    console.log(layout)

    if (isLoading || camps.length < 1) return <p> loading</p>
    return (
        <div>
            <Helmet>
                <title>PureLife Health | Available Camps</title>
            </Helmet>
            <h2 className=" text-5xl font-bold text-center mb-14">Available Camps</h2>

            <div className=" flex flex-col md:flex-row md:justify-center items-center md:mb-10 gap-5 lg:gap-14">
                <div>
                    <form onSubmit={handleSearchbtn}>
                        <div className='flex p-1 overflow-hidden border border-gray-500 rounded-lg    focus-within:ring focus-within:ring-opacity-40 focus-within:border-blue-400 focus-within:ring-blue-300'>
                            <input
                                className='px-6 py-2 text-gray-700 placeholder-gray-500 bg-white outline-none focus:placeholder-transparent'
                                type='text'
                                onChange={e => setSearchText(e.target.value)}
                                value={searchText}
                                name='search'
                                placeholder='Campname,location,etc '
                                aria-label='Enter Camps Name'
                            />

                            <button className='px-1 md:px-4 py-3 text-sm font-medium uppercase  btn bg-orange-300 hover:btn-info rounded-md'>
                                Search
                            </button>
                        </div>
                    </form>
                </div>

                <div className=" flex items-center ">
                    <div>
                        <select
                            onChange={e => {
                                setParticipant(e.target.value)
                            }}
                            value={participant}
                            name='participant'
                            id='participant'
                            className='border border-gray-500 p-4 rounded-md'
                        >
                            <option value=''>Sort By Most Registered</option>
                            <option value='dsc'>Descending</option>
                            <option value='asc'>Ascending</option>
                        </select>
                    </div>
                </div>
                <div className=" flex  items-center ">
                    <div>
                        <select
                            onChange={e => {
                                setdate(e.target.value)
                                // setCurrentPage(1)
                            }}
                            value={date}
                            name='date'
                            id='date'
                            className='border border-gray-500 p-4 rounded-md'
                        >
                            <option value=''>Sort By Camps Date</option>
                            <option value='dsc'>Descending</option>
                            <option value='asc'>Ascending</option>
                        </select>
                    </div>
                </div>
                <div className="hidden md:flex">
                    <button data-tip="Layout Three Colums" onClick={() => setToggle(!toggle)} className={" hover:btn-info hover:btn  tooltip " + (!toggle ? 'show' : 'hidden')}>
                        <BsLayoutThreeColumns className="w-[50px] h-10" /></button>

                    <button data-tip="Layout Two Colums" onClick={() => setToggle(!toggle)} className={"tooltip hover:btn-info hover:btn " + (toggle ? 'show' : 'hidden')}>
                        <LuColumns className="w-[50px] h-10" /></button>
                </div>
            </div>

            <div className={"grid mt-6 " + (toggle ? 'md:gap-3  md:grid-cols-3 ' : 'md:grid-cols-2 md:gap-10')}>
                {
                    camps.length > 0 && camps.map((camp) =>
                        <Link key={camp._id} to={`/camps/${camp._id}`} >
                            <div className="p-8 bg-base-100 shadow-xl rounded-3xl" >
                                <div className={"gap-3 " + (toggle ? ' space-y-5' : ' flex')}>
                                    <div className={"  " + (toggle ? 'w-full ' : ' w-4/5')}>
                                        <img className=" w-full rounded-lg" src={camp.image} alt="Album" />
                                    </div>
                                    <div >
                                        <p>Location: {camp.location}</p>
                                        <p>Fees: {camp.campFees}</p>
                                        <p>Date: {new Date(camp.dateAndTime).toLocaleDateString('en-GB', {
                                            day: '2-digit',
                                            month: '2-digit',
                                            year: 'numeric'
                                        })}</p>
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