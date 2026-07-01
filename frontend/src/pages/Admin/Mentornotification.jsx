import React, { useState,useEffect } from "react";
import {
  Bell,
  BookOpen,
  Settings,
  CheckCircle,
  Clock,
} from "lucide-react";
import axios from "axios"

const Mentornotification = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [resource,setResource]=useState([]);
  const [idea,setIdeas]=useState([]);
  const[mentors,setMentors]=useState([]);
  const all=[];

 const getCurrentNotifications = () => {
    switch (activeTab) {
      case "mentorlogin_request":
        return mentors;
      case "resource":
        return resource;
      case "idea":
        return idea;
    
      default:
        return all;
       
    }
  };

  
   useEffect(()=>{
        const getMentors=async()=>{
            try{
            const [men,res]=await Promise.all([axios.get("http://localhost:5000/api/admin/admin/pending-mentors"),
              axios.get("http://localhost:5000/api/admin/pendingresource")
            ]) ;
            setMentors(men.data);
            setResource(res.data);
            console.log(res.data);
            }catch(err){
                console.log(err);
            }
            }
            getMentors();

    },[]);
   const token=localStorage.getItem("token");
    const handleAccept=async(id)=>{
      await axios.put(`http://localhost:5000/api/admin/approvedresource/${id}`);
      setResource(prev=>prev.filter(m=>m._id!==id));
      alert("mentor resource approved");
    }
    const handleReject=async(id)=>{
      await axios.put(`http://localhost:5000/api/admin/rejectresource/${id}`);
       setResource(prev=>prev.filter(m=>m._id!==id));
      alert("mentor resource rejected");

    }

    const approve=async(id,name)=>{
      await axios.post(`http://localhost:5000/api/admin/admin/aprove/${id}`);
      setMentors(mentors.filter((m)=>m._id !==id));
      alert(`${name} request has been approved`);
    }

    const reject=async(id,name)=>{
      await axios.post(`http://localhost:5000/api/admin/admin/reject/${id}`);
      setMentors(mentors.filter((m)=>m._id !==id));
      alert(`${name} request has been rejected`);
    }


  
  return (
    <div className="min-h-screen bg-slate-50 p-6 pt-20">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex items-center gap-3">
            <Bell size={28} className="text-blue-600" />
            <div>
              <h1 className="text-2xl font-bold text-slate-800">
                Notifications
              </h1>
              <p className="text-slate-500">
                Stay updated with your SkillHub activities
              </p>
            </div>
          </div>
        </div>

        {/* Nested Navbar */}
        <div className="bg-white rounded-xl shadow-sm mb-6">
          <div className="flex border-b overflow-x-auto">
            <button
              onClick={() => setActiveTab("all")}
              className={`flex items-center gap-2 px-6 py-4 font-medium transition ${
                activeTab === "all"
                  ? "border-b-2 border-blue-600 text-blue-600"
                  : "text-gray-500 hover:text-blue-600"
              }`}
            >
              <Bell size={18} />
              All Notifications
            </button>

            <button
              onClick={() => setActiveTab("mentorlogin_request")}
              className={`flex items-center gap-2 px-6 py-4 font-medium transition ${
                activeTab === "mentorlogin_request"
                  ? "border-b-2 border-blue-600 text-blue-600"
                  : "text-gray-500 hover:text-blue-600"
              }`}
            >
              <BookOpen size={18} />
              mentor login request
            </button>

            <button
              onClick={() => setActiveTab("resource")}
              className={`flex items-center gap-2 px-6 py-4 font-medium transition ${
                activeTab === "resource"
                  ? "border-b-2 border-blue-600 text-blue-600"
                  : "text-gray-500 hover:text-blue-600"
              }`}
            >
              <Settings size={18} />
              mentor resources
            </button>
            <button
              onClick={() => setActiveTab("idea")}
              className={`flex items-center gap-2 px-6 py-4 font-medium transition ${
                activeTab === "idea"
                  ? "border-b-2 border-blue-600 text-blue-600"
                  : "text-gray-500 hover:text-blue-600"
              }`}
            >
              <Settings size={18} />
              mentors business idea
            </button>
          </div>

          {/* Notification List */}
          <div className="p-6">
            <div className="space-y-4">
              {getCurrentNotifications().map((item, index) => (
                <div
  key={index}
  className="border rounded-lg p-4 hover:bg-slate-50 transition"
>
  <div className="flex justify-between items-start">
    <div className="flex gap-3 flex-1">
      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
        <CheckCircle
          size={18}
          className="text-blue-600"
        />
      </div>

      <div className="flex-1">
       
        <p className="text-slate-600 mt-1">
          {activeTab==="resource" ?"new mentor wants to addd new resource" :activeTab==="session"?item.topic:item.message}
        </p>
        <h3 className="font-semibold text-slate-800">
          { activeTab==="resource" ?item.title:activeTab==="mentorlogin_request"?item.name:item.title}
        </h3>
        <h3 className="font-semibold text-slate-800">
          { activeTab==="resource" ?item.description:activeTab==="mentorlogin_request"?"new mentor arrived ":item.title}
        </h3>
        {/* <h3 className="font-semibold text-slate-800">
          { activeTab==="resource" ?item.category:activeTab==="mentorlogin_request"?item.userId.name:item.title}
        </h3> */}
        
       

        {/* Action Buttons */}
         {activeTab==="resource"? (
        <div className="flex gap-3 mt-4">
          <button
            onClick={()=>handleAccept(item._id)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm font-medium"
          >
            Accept
          </button>
          <button
            onClick={()=> handleReject(item._id)}
            className="px-4 py-2 border border-red-500 text-red-500 rounded-lg hover:bg-red-50 transition text-sm font-medium"
          >
            Reject
          </button>
        </div>)
        :activeTab==="idea"?( <div className="flex gap-3 mt-4">
         
        </div>):activeTab==="mentorlogin_request"? (<div><button
            onClick={()=>approve(item._id,item.name)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm font-medium"
          >
            Accept
          </button>
          <button
            onClick={() => reject(item._id,item.name)}
            className="px-4 py-2 border border-red-500 text-red-500 rounded-lg hover:bg-red-50 transition text-sm font-medium"
          >
            Reject
          </button></div>)
          :(<div></div>)}
      </div>
    </div>
<div>
    <div className="flex items-center  gap-1 text-sm text-gray-500">
      <Clock size={14} />
      {activeTab==="bookings"? new Date(item.date).toLocaleDateString(): item.time}
      </div>
     
      <button className="mt-3  hover:text-2xl">delete</button>
      
    </div>
  </div>
</div>
              ))}
            </div>

            {getCurrentNotifications().length === 0 && (
              <div className="text-center py-12">
                <Bell className="mx-auto text-gray-300" size={60} />
                <p className="text-gray-500 mt-4">
                  No notifications found
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

}

export default Mentornotification;