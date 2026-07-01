import React from "react";
import axios from "axios";
import {useState,useEffect} from "react"
import {FiUser} from "react-icons/fi"
import {FiSettings,FiMapPin,FiCalendar,FiBriefcase,FiMessageCircle,FiCode,FiSearch,FiStar} from "react-icons/fi"
import {BiCategory} from "react-icons/bi"
import { MdVerified } from "react-icons/md";
import { Eye,Search } from "lucide-react";

const MentorList = () => {
  // sample mentor data
   const[mentors,setMentors]=useState([]);
   useEffect(()=>{
    const fetchmentors=async()=>{
      try{
      const res=await axios.get("http://localhost:5000/api/mentor/getmentors");
      console.log(res);
      setMentors(res.data);
      }catch(error){
        console.log(error.message);
      }

    }
    fetchmentors();
   },[]);
  return (
    <div className="p-26 pt-20 bg-gra">
      {/* Page Header */}
      <div className="mb-6 text-center ">
        <h1 className="text-3xl font-bold text-cyan-900">Active mentors</h1>
        <p className="text-gray-600">
          mange mentors
        </p>
        <form className="flex  justify-center items-center">
            <input type="text"placeholder={<FiSearch/>} className="w-[50%] h-10 border-3 bg-white px-8 border-blue-900  hover:border-blue-500 duration-500 ring-transparent rounded-full ring-2 focus:ring-cyan-400"/>
            <button className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-full  p-3"><Search/></button>
        </form>
      </div>

      {/* Mentor Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-2 ">
        
        
        {mentors.map((mentor, idx) => (
         
          <div
            key={idx}
            className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 "
          ><div className="h-[170px] bg-gradient-to-r from-blue-900 to-cyan-600 rounded-b">
            <div className="flex justify-end w-75" ><p className="bg-blue-100 shadow-2xl text-blue-800 rounded-full w-21 flex items-center justify-center mt-5"><FiStar/>Mentor</p></div>
            {/* Mentor Avatar */}
            <div className="flex justify-center ">
                
              <img
                src={`http://localhost:5000${mentor.profilePicture}`}
                alt={mentor.mentor.name}
                className="w-24 h-24 rounded-full border-3 border-white p-[2px] "
              />
              
            </div>
            </div>

            {/* Mentor Info */}
            <div className="p-3 text-center">
                <div className="flex justify-center items-center flex-col">
              <h2 className="text-xl font-bold flex items-center text-center">{mentor.fullName}<span className="text-blue-500"><MdVerified/></span></h2>
              <p className="text-blue-600 font-semibold bg-blue-100 shadow-2xl text-blue-800 rounded-full w-21 flex items-center justify-center"><span><BiCategory/></span>{mentor.category.name}</p>
              </div>
              <div className="flex flex-col justify-center">
            <div className=" border-b-2  border-gray-400"><p className="text-gray-600 text-sm mt-2 flex items-center"><span className="bg-violet-100 rounded-full p-2 text-[20px] text-violet-700 mr-4"><FiUser/></span>{mentor.fullName} years</p></div>
             <div className=" border-b-2  border-gray-400"><p className="text-gray-600 text-sm mt-2 flex items-center"><span className="bg-green-100 rounded-full p-2 text-[20px] text-green-700 mr-4"><FiBriefcase/></span>{mentor.experience} years</p></div>
              
             <div className=" border-b-2  border-gray-400"><p className="text-gray-600 text-sm mt-2 flex items-center"><span className="bg-orange-100 rounded-full p-2 text-[20px] text-orange-500 mr-4"><FiCalendar/></span>{mentor.session} years</p></div></div>

              {/* Action Buttons */}
              <div className="mt-4 flex justify-center space-x-2">
                {/* <button className="bg-gradient-to-r from-blue-500 to-blue-400 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
                  view profile
                </button> */}
                <button className="flex items-center gap-2 px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50"onClick={()=>viewProfile(u._id)}>
                      <Eye size={18} />
                        View Profile
                       </button>
                
                <button className="bg-gradient-to-r from-[#0668ca] to-cyan-500 text-white px-4 py-2 rounded  transition">
                  suspend
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
