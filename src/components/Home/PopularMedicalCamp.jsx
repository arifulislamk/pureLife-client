
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const PopularMedicalCamp = () => {
    const [data, setData] = useState([])
    useEffect(() => {
        axios('/camps.json')
            .then(data => {
                setData(data.data)
            })
    }, [])
    return (
        <div className=" mt-20">
            <h2 className=" text-5xl font-bold text-center mb-14">Popular Medical Camps</h2>
            <div className=" grid grid-cols-2 gap-5">
                {
                    data.map((camp, index) =>
                        <Link key={index} to={`/camp-details/${camp._id}`} >
                            <div className="p-4 bg-base-100 shadow-xl rounded-3xl" >
                                <div className="flex gap-3 ">
                                    <div className=" w-4/5 ">
                                        <img className=" w-full rounded-lg" src="https://i.ibb.co/1dWWDct/Free-Medical-Camp.jpg" alt="Album" />
                                    </div>
                                    <div className=" ">
                                        <p>Location: {camp.location}</p>
                                        <p>Fees: {camp.campFees}</p>
                                        <p>Date: {camp.dateAndTime}</p>
                                        <p>Participant : {camp.participantCount}</p>
                                    </div>
                                </div>
                                <div className=" mt-14">
                                    <h2 className="card-title mb-5">{camp.campName}</h2>
                                    <p>{camp.healthcareProfessional}</p>
                                    <p className="  ">{camp.description}</p>

                                    <div className="card-actions justify-end">
                                        <button className="btn btn-guest">Join Camp</button>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    )
                }
            </div>

            <div className=" text-center mt-6 mb-10">
                <Link to='/available-camps'>  <button className="btn">See All Camps</button></Link>
            </div>
        </div >
    );
};

export default PopularMedicalCamp;