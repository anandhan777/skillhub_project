import React, { useState } from "react";
import PendingBookings from "./Pending_bookings";
import ResourceAnalysisChart from "./ResourceAnalysisChart";
import MentorConnectionsChart from "./Connection_analysis";
import {X} from "lucide-react";

import axios from "axios";

const MentorDashboard = () => {

  const[global,setGlobal]=useState([]);
  const[reviews,setReviews]=useState([]);
  const[session,setSession]=useState(0);
  const[resource,setresource]=useState(0);
  const[collection,setCollection]=useState({connection:0,resource:0});
  const[rating,setrating]=useState({totalrating:0,totalrevews:0,average:0});
  const user=JSON.parse(localStorage.getItem("user"));
  useState(()=>{
    const fetchcollection=async()=>{
      try{
      const [res,rat,glo,list]=await Promise.all([axios.get(`http://localhost:5000/api/mentor/collections/${user.id}`),
        axios.get(`http://localhost:5000/api/mentor/calculaterating/${user.id}`),
         axios.get("http://localhost:5000/api/admin/globalnotification"),
         axios.get(`http://localhost:5000/api/mentor/latestreview/${user.id}`),
      ]);
      setCollection(res.data);
      setrating(rat.data);
      setGlobal(glo.data);
      setReviews(list.data);
      console.log(res.data)
      }catch(error){
      console.log(error);
      }
    }
    fetchcollection();
  

  },[])

  const deleteMsg=async(id)=>{
    try{
      await axios.delete(`http://localhost:5000/api/users/deletemsg/${id}`)
      setGlobal(prev=>prev.filter(m=>m._id!==id))
    }catch(error){
      console.log(error);
    }

  }
  
  return (
    <div>
    <div className="pl-20 pr-10 pt-20 bg-slate-50 min-h-screen flex gap-">
        <div>
      <h1 className="text-3xl font-bold ">Mentor Dashboard</h1>

      {/* Overview */}
      <section className="flex gap-5 mb-6">
        <div className="bg-gradient-to-r from-slate-200 to-slate-100 p-4 rounded-2xl shadow w-[250px] h-[120px]">
          <h2 className="text-lg font-semibold"> connected Mentees</h2>
          <p className="text-2xl font-bold">{collection.connection}</p>
        </div>
        <div className="bg-gradient-to-r from-slate-200 to-slate-100 p-4 rounded-2xl shadow w-[250px] h-[120px]">
          <h2 className="text-lg font-semibold">Upcoming Sessions</h2>
          <p className="text-2xl font-bold">3</p>
        </div>
        <div className="bg-gradient-to-r from-slate-200 to-slate-100 p-4 rounded-2xl shadow w-[250px] h-[120px]">
          <h2 className="text-lg font-semibold">UploadedResources</h2>
          <p className="text-2xl font-bold">{collection.resource}</p>
        </div>
        <div className="bg-gradient-to-r from-slate-200 to-slate-100 p-4 rounded-2xl shadow w-[250px] h-[120px]">
          <h2 className="text-lg font-semibold">Avg Rating</h2>
          <p className="text-2xl font-bold">{rating.average}</p>
        </div>
      </section>

      {/* Mentees */}
      <section className="bg-white grid grid-cols-2 gap-5 p-6 rounded shadow-xl h-[450px] mb-6">
        <div className=" shadow-xl rounded-2xl flex justify-center items-center"><ResourceAnalysisChart/></div>
        <div className=" shadow-xl rounded-2xl "><MentorConnectionsChart/></div>
        
        
        {/* map mentees here */}
      </section>

      {/* Resources */}
     

      {/* Sessions */}
      
      </div>
     
      
  <div className="p-5 mb-6 w-full h-[594px] border border-slate-200 rounded-2xl shadow-sm bg-gradient-to-b from-blue-500 to-cyan-500 ml-5 mt-9 overflow-y-hidden">

    {/* Header */}
    <div className="flex items-center gap-20 justify-between pb-4 border-b border-slate-200 fixed">
      <h2 className="text-xl font-semibold text-slate-800">
        Notifications
      </h2>

      <span className="px-3 py-1 text-xs font-medium bg-blue-100 text-blue-700 rounded-full">
        {global.length}new
      </span>
    </div>

    {/* Notification */}
    <div className="mt-5 flex flex-col gap-4 pt-10">
      {global.map(m=>(
      <div key={m._id} className="flex items-start gap-4 p-4 bg-white border border-slate-200 rounded-xl hover:shadow-md transition-all duration-200 cursor-pointer">

        <div className="w-3 h-3 bg-blue-600 rounded-full mt-2"></div>

        <div className="flex-1">
          <div className="flex">
          <p className="text-slate-800 font-medium">
            {m.message}
          </p>
          <button onClick={()=>deleteMsg(m._id)}><X size={15}/></button>
          </div>

          <p className="text-sm text-slate-500 mt-1">
            {m.createdAt}
          </p>
        </div>

      </div>
      ))}
    </div>
    


</div>

    </div>
    <section className="bg-white p-2 rounded-2xl shadow-lg  mb-6 overflow-y-auto h-[200px] mx-26">
        <h2 className="text-xl font-bold mb-4"></h2>
        <PendingBookings/>
      </section>
      <section className="bg-white p-6 rounded shadow mb-6 px-26">
        <h2 className="text-xl font-bold mb-4 ">Feedback</h2>
        {reviews.map((review) => (
        <div
          key={review._id}
          className="bg-white rounded-xl shadow-sm border mb-5 p-5 hover:shadow-md transition"
        >
          <div className="flex justify-between items-start">

            <div className="flex gap-10 items-center">
              <h3 className="font-semibold text-gray-800">
                {review.userId?.name}
              </h3>

              <div className="text-yellow-500 mt-1">
                {"⭐".repeat(review?.rating)}
              </div>
            </div>

            <span className="text-sm text-gray-400">
              {new Date(review.createdAt).toLocaleDateString()}
            </span>

          </div>

          <p className="mt-4 text-gray-600 leading-relaxed">
            {review?.feedback}
          </p>
        </div>
      ))}
      
      </section></div>
  );
};

export default MentorDashboard;
