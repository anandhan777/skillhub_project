import React from "react";
import axios from "axios";
import {useState,useEffect} from "react"
import { FaSearch } from "react-icons/fa";
import {FiUser} from "react-icons/fi"
import {FiSettings,FiMapPin,FiCalendar,FiBriefcase,FiMessageCircle,FiCode,FiSearch,FiStar} from "react-icons/fi"
import {BiCategory} from "react-icons/bi"
import { MdVerified } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const MentorList = () => {

  const navigate=useNavigate();
  // sample mentor data
  const user=JSON.parse(localStorage.getItem("user"));
   const[mentors,setMentors]=useState([]);
   useEffect(()=>{
    const fetchmentors=async()=>{
      try{
      const res=await axios.get(`${import.meta.env.VITE_API_URL}/api/mentor/getmentors/${user.id}`);
      console.log(res);
      setMentors(res.data);
      }catch(error){
        console.log(error.message);
      }

    }
    fetchmentors();
   },[]);
   
  return (
    <div className="p-26 pt-20 bg-gray-100">
      {/* Page Header */}
      <div className="mb-6 text-center">
        <h1 className="text-3xl font-bold">Mentorship Connection</h1>
        <p className="text-gray-600">
          Browse mentor profiles, book sessions, and ask questions.
        </p>
        <form>
            <input type="text"placeholder={<FiSearch/>} className="w-[50%] h-12 border-3 bg-white px-8 border-blue-900  hover:border-blue-500 duration-500 rounded-full"/>
            <button className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-full p-4 text-xl"><FaSearch/></button>
        </form>
      </div>

      {/* Mentor Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-2 ">
        
        
        {mentors.map((mentor, idx) => (
         
          <div
            key={idx}
            className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 "
          ><div className="h-[170px] bg-gradient-to-r from-blue-900 to-cyan-500 rounded-b">
            <div className="flex justify-end w-75" ><p className="bg-blue-100 shadow-2xl text-blue-800 rounded-full w-21 flex items-center justify-center mt-5"><FiStar/>Mentor</p></div>
            {/* Mentor Avatar */}
            <div className="flex justify-center ">
                
              <img
                src={`${import.meta.env.VITE_API_URL}${mentor.profilePicture}`}
                alt={mentor.mentor.name}
                className="w-24 h-24 rounded-full border-3 object-cover border-white p-[2px] "
              />
              
            </div>
            </div>

            {/* Mentor Info */}
            <div className="p-4 pt-2 text-center">
                <div className="flex justify-center items-center flex-col">
              <h2 className="text-xl font-bold flex items-center text-center">{mentor.fullName}<span className="text-blue-500"><MdVerified/></span></h2>
              <p className="text-blue-600 font-semibold bg-blue-100 shadow-2xl text-blue-800 rounded-full px-3 py-1 flex items-center justify-center"><span><BiCategory/></span>{mentor.category?.name}</p>
              </div>
              <div className="flex flex-col justify-center">
            <div className=" border-b-2  border-gray-400"><p className="text-gray-600 text-sm mt-2 flex items-center"><span className="bg-violet-100 rounded-full p-2 text-[20px] text-violet-700 mr-4"><FiUser/></span>{mentor.fullName} years</p></div>
             <div className=" border-b-2  border-gray-400"><p className="text-gray-600 text-sm mt-2 flex items-center"><span className="bg-green-100 rounded-full p-2 text-[20px] text-green-700 mr-4"><FiBriefcase/></span>{mentor.experience} years</p></div>
              
             <div className=" border-b-2  border-gray-400"><p className="text-gray-600 text-sm mt-2 flex items-center"><span className="bg-orange-100 rounded-full p-2 text-[20px] text-orange-500 mr-4"><FiCalendar/></span>{mentor.session} years</p></div></div>

              {/* Action Buttons */}
              <div className="mt-4 flex justify-center space-x-2">
                <button onClick={()=>{navigate(`/user/booking/${mentor.mentor._id}`)}} className="bg-[#0080ff] text-white px-4 py-2 rounded hover:bg-blue-600 transition">
                  Book Session
                </button>
                <button onClick={()=>{navigate(`/user/viewmentorprofile/${mentor._id}`)}} className="bg-[#42e0d1] text-white px-4 py-2 rounded hover:bg-green-300 transition">
                  view profile
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MentorList;
