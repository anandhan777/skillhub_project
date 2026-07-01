import React, { useState,useEffect } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import {X} from "lucide-react"
import {
  Bell,
  BookOpen,
  Settings,
  CheckCircle,
  Clock,
} from "lucide-react";

const UNotificationPage = () => {
  const [activeTab, setActiveTab] = useState([]);
  const [allmessage,setAllmessage]=useState([]);
  const [connect,setConnect]=useState([]);
  const [session,setSession]=useState([]);
  const [glob,setGlob]=useState([]);

  useEffect(()=>{
    const allnotification=async()=>{
    const token=localStorage.getItem("token");
    const user=JSON.parse(localStorage.getItem("user"));
    try{
      const [res,con,glo,sec]=await Promise.all([axios.get("http://localhost:5000/api/users/getallnotification",{headers:{Authorization:`Bearer ${token}`}}),
        axios.get(`http://localhost:5000/api/users/connectionrequest/${user.id}`),
      axios.get("http://localhost:5000/api/admin/globalnotification"),
    axios.get(`http://localhost:5000/api/users/bookingconfirm/${user.id}`)]);
      console.log(res.data);
      console.log(con.data);
      setAllmessage(res.data);
      setConnect(con.data);
      setGlob(glo.data);
      setSession(sec.data);
    }catch(error){
      console.log(error);
    }
  }
  allnotification();

  },[])

  

  const deleteMsg=async(id)=>{
    try{
      const data=await axios.delete(`http://localhost:5000/api/users/deletemsg/${id}`);
      const data1=await axios.delete(`http://localhost:5000/api/users/deletebooking/${id}`);
      setAllmessage(pre=>pre.filter(i=>i._id!==id));
      setGlob(pre=>pre.filter(i=>i._id!==id));
      setSession(pre=>pre.filter(i=>i._id!==id));
    }catch(error){
      console.log(error);
    }
  }
  

  const notifications = {
   

    // session: [
    //   {
    //     title: "New Video Available",
    //     message: "Advanced React Hooks tutorial added.",
    //     time: "1 hour ago",
    //   },
    //   {
    //     title: "Checklist Updated",
    //     message: "Node.js roadmap checklist has been updated.",
    //     time: "3 hours ago",
    //   },
    // ],

    connection: [
      {
        title: "Account Security",
        message: "Password changed successfully.",
        time: "Yesterday",
      },
      {
        title: "Maintenance Notice",
        message: "Platform update scheduled this weekend.",
        time: "2 days ago",
      },
    ],
  };
 const user=JSON.parse(localStorage.getItem("user"));
  const handleAccept=async(id)=>{
    await axios.put(`http://localhost:5000/api/users/connectionaccept/${user.id}/${id}`,{status:"accept"});
    alert('request accepted successfully');
  }

  const handleReject=async(id)=>{
     await axios.put(`http://localhost:5000/api/users/connectionreject/${user.id}/${id}`,{status:"reject"});
    alert('request rejected');
  }

  const getCurrentNotifications = () => {
    switch (activeTab) {
      case "learning":
        return glob;
      case "connection":
        return connect;
      case "sessionrequest":
        return session;
      default:
        return allmessage;
    }
  };

  return (
    <div className="min-h-screen mt-15 bg-slate-50 p-6">
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
              onClick={() => setActiveTab("learning")}
              className={`flex items-center gap-2 px-6 py-4 font-medium transition ${
                activeTab === "learning"
                  ? "border-b-2 border-blue-600 text-blue-600"
                  : "text-gray-500 hover:text-blue-600"
              }`}
            >
              <BookOpen size={18} />
              Learning Updates
            </button>
            <button
              onClick={() => setActiveTab("sessionrequest")}
              className={`flex items-center gap-2 px-6 py-4 font-medium transition ${
                activeTab === "sessionrequest"
                  ? "border-b-2 border-blue-600 text-blue-600"
                  : "text-gray-500 hover:text-blue-600"
              }`}
            >
              <BookOpen size={18} />
              session booking
            </button>

            <button
              onClick={() => setActiveTab("connection")}
              className={`flex items-center gap-2 px-6 py-4 font-medium transition ${
                activeTab === "connection"
                  ? "border-b-2 border-blue-600 text-blue-600"
                  : "text-gray-500 hover:text-blue-600"
              }`}
            >
              <Settings size={18} />
              connection request
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
        <h3 className="font-semibold text-slate-800">
          {activeTab==="sessionrequest"? `you booking request has been approved by mentor ${item.mentorId.name}`:item.title}
        </h3>

        <p className="text-slate-600 mt-1">
          {activeTab==="sessionrequest"? `on the topic of ${item.topic}`:item.message}
        </p>
        <NavLink to={item.link} className="text-blue-500">
          {activeTab==="sessionrequest"&&`click here to join the class room `}
        </NavLink>

        {/* Action Buttons */}
         {activeTab==="connection"? (
        <div className="flex gap-3 mt-4">
          <button
            onClick={() => handleAccept(item._id)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm font-medium"
          >
            Accept
          </button>

          <button
            onClick={() => handleReject(item._id)}
            className="px-4 py-2 border border-red-500 text-red-500 rounded-lg hover:bg-red-50 transition text-sm font-medium"
          >
            Reject
          </button>
        </div>)
        :(<div></div>)}
      </div>
    </div>
<div>
    <div className="flex items-center  gap-1 text-sm text-gray-500">
      <Clock size={14} />
      {item.time}
      </div>
     
      <button onClick={()=>deleteMsg(item._id)} className=" bg-gray-300 rounded-full p-1 "><X size={18}/></button>
      
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
};

export default UNotificationPage;