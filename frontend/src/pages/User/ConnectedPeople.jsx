import React, { useEffect, useState } from "react";
import axios from "axios";
import { Search, MessageCircle, Eye, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ConnectedPeople = () => {
  const navigate=useNavigate();
  const [connections, setConnections] = useState([]);
  const[search,setSearch]=useState("");
 const user=JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    const fetchConnections = async () => {
      const user=JSON.parse(localStorage.getItem("user"));
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/users/connectedpeople/${user.id}`);
        setConnections(res.data);
        console.log(res.data);
      } catch (err) {
        console.error("Error fetching connections:", err);
      }
    };
    fetchConnections();
  }, [user.id]);

  const searchClick=async()=>{
    try{
      const res=await axios.get(`${import.meta.env.VITE_API_URL}/api/users/searchconnection?search=${search}`);
      setConnections(res.data);
    }catch(error){
      console.log(error);
    }
  }
  return (

   <div className="min-h-screen bg-slate-50 p-6 mt-13">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <h1 className="text-3xl font-bold text-slate-800">
            Connected People
          </h1>
          
          <p className="text-slate-500 mt-2">
            Manage your professional network and start conversations.
          </p>

          {/* Search */}
          <div className="mt-5 relative flex gap-2">
            <Search
              size={18}
              className="absolute left-4 top-3.5 text-gray-400"
            />
            <input
              type="text"
              value={search}
              onChange={(e)=>setSearch(e.target.value)}
              placeholder="Search connections..."
              className="w-[97%] pl-11 pr-4 py-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button onClick={searchClick} className=" bg-blue-500 py-3 px-4 rounded-full">  <Search
              size={18}
              className=" text-white text-2xl "/></button>
          </div>
        </div>

        {/* Connection Cards */}
       <div className="space-y-4">
  {connections.map(conn => {
    return (<div
      key={conn._id}
      className="bg-white border rounded-xl p-5 shadow-sm hover:shadow-md transition"
    >
      <div className="flex items-center justify-between">
    

        
        {/* Left Section */}
        <div className="flex items-center gap-5">
          <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center">
            <User size={28} className="text-blue-600" />
            <img src={`${import.meta.env.VITE_API_URL}${conn.profilePicture}`} alt="profile" className='w-14 h-14 rounded-full object-cover'/>
          </div>

          <div>
            <h2 className="font-semibold text-lg text-slate-800">
              {conn.fullName}
            </h2>

            <p className="text-sm text-slate-500">
              {conn.mentor.email}
            </p>
          </div>

          <div>
            <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm">
              {conn.mentor.role}
            </span>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex gap-3">
          <button onClick={()=>navigate(`/user/viewmentorprofile/${conn._id}`)} className="flex items-center gap-2 px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50">
            <Eye size={18} />
            View Profile
          </button>

          <button onClick={()=>navigate("/user/chatpage")}className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            <MessageCircle size={18} />
            Message
          </button>
        </div>
      </div>
    </div>);
})}
</div>

        {/* Empty State */}
        {connections.length === 0 && (
          <div className="bg-white rounded-xl p-10 text-center shadow-sm">
            <User size={60} className="mx-auto text-gray-300" />
            <h3 className="text-xl font-semibold mt-4">
              No Connections Yet
            </h3>
            <p className="text-gray-500 mt-2">
              Start connecting with mentors, students, and entrepreneurs.
            </p>
          </div>
        )}
      </div>
    </div>);
};

export default ConnectedPeople;
