import React, { useState,useEffect } from "react";
import {
  Bell,
  BookOpen,
  Settings,
  CheckCircle,
  Clock,
} from "lucide-react";
import axios from "axios"

const MNotificationPage = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [connect,setConnect]=useState([]);
  const [bookings,setBookings]=useState([]);
  const[accept,setAccept]=useState("");
  const [classroomLink,setClassroomLink]=useState("")
  const user=JSON.parse(localStorage.getItem("user"));
  const mentorId=user.id;

  useEffect(()=>{
    const fetchNotification=async()=>{
      const user=JSON.parse(localStorage.getItem("user"));
      try{
        const res=await axios.get(`http://localhost:5000/api/users/connectionrequest/${user.id}`)
        setConnect(res.data)
     
      }catch(error){
        console.log(error);
      }
    }
    fetchNotification();
  },[])

   useEffect(() => {
    const fetchBookings = async () => {
      const res = await axios.get(`http://localhost:5000/api/mentor/pendingbookings/${mentorId}`);
      setBookings(res.data.filter(b => b.status === "pending")); 
      console.log(res.data);// only pending
    };
    fetchBookings();
  }, [mentorId]);
 
   const handleDecision = async (bookingId, status, classroomLink) => {
    console.log(bookingId,status,classroomLink);
    try {
      const res = await axios.put(`http://localhost:5000/api/users/showbooking/${bookingId}`,{status,classroomLink});
      alert(`Booking ${status}`);
      // update local state
      // setBookings(prev => prev.filter(b => b._id !== bookingId));
    } catch (err) {
      console.error("Error updating booking:", err);
    }
  };
const all=[];


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
      case "session":
        return bookings;
      case "connection":
        return connect;
      default:
        return all;
    }
  };

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
              onClick={() => setActiveTab("session")}
              className={`flex items-center gap-2 px-6 py-4 font-medium transition ${
                activeTab === "session"
                  ? "border-b-2 border-blue-600 text-blue-600"
                  : "text-gray-500 hover:text-blue-600"
              }`}
            >
              <BookOpen size={18} />
              booking request
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
          { activeTab==="connection" ?item.senderId.name:activeTab==="session"?item.userId.name:item.title}
        </h3>

        <p className="text-slate-600 mt-1">
          {activeTab==="connection" ?"wants to connect with you" :activeTab==="session"?item.topic:item.message}
        </p>

        {/* Action Buttons */}
         {activeTab==="connection"? (
        <div className="flex gap-3 mt-4">
          <button
            onClick={() =>handleAccept(item._id)}
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
        :activeTab==="session"?( <div className="flex gap-3 mt-4">
          <button
            onClick={()=>setAccept(item._id)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm font-medium"
          >
            Accept
          </button>
          <button
            onClick={() => handleDecision(item._id,"rejected")}
            className="px-4 py-2 border border-red-500 text-red-500 rounded-lg hover:bg-red-50 transition text-sm font-medium"
          >
            Reject
          </button>
          {accept===item._id?(
          <form onSubmit={() =>handleDecision(item._id,"approved",classroomLink)}>
            <input type="text" value={classroomLink} onChange={(e) => setClassroomLink(e.target.value)} placeholder="provide the classroom link" className="border-2 border-blue-600 rounded-2xl w-90 h-8"/>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm font-medium">send link</button>
          </form>):null}
        </div>):(<div></div>)}
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
};

export default MNotificationPage;