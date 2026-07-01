import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import UsersPerCategoryChart from "./Userper_category";
import MentorDistributionChart from "./Mentorsper_category";
import axios from "axios"

const AdminDashboard = () => {
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPendingMentors, setTotalPendingMentors] = useState(0);
  const [totalRoadmaps, setTotalRoadmaps] = useState(0);
  const [totalBusinessIdeas, setTotalBusinessIdeas] = useState(0);

   const navigate=useNavigate();

   useEffect(()=>{
  
      const fetchData=async()=>{
          try{
        const usersRes=await axios.get("http://localhost:5000/api/admin/total-users");
        const pendingMentorsRes=await axios.get("http://localhost:5000/api/admin/total-pending-mentors");
        const roadmapsRes=await axios.get("http://localhost:5000/api/admin/total-roadmaps");
        const businessIdeasRes=await axios.get("http://localhost:5000/api/admin/total-business-ideas");
      
        setTotalUsers(usersRes.data.totalUsers);
        setTotalPendingMentors(pendingMentorsRes.data.totalPendingMentors);
        setTotalRoadmaps(roadmapsRes.data.totalRoadmaps);
        setTotalBusinessIdeas(businessIdeasRes.data.totalBusinessIdeas);
    
        }catch(err){

       console.log(err.message);
  }

}
fetchData();
},[]);
   



  const navClick=()=>{
   
    navigate("/admin/addcategory");
  }
  return (
    <div className="admin-dashboard p-6 pl-20 pt-20  bg-white">
      {/* Top Overview Cards */}
      <div className="flex w-screen">
      <div >
      <div className="overview-cards grid grid-cols-4 gap-6 mb-6">
        <div className=" bg-gradient-to-r from-slate-200 to-white card flex flex-col justify-center items-center text-[18px] font-semibold p-4  w-[232px] h-[110px] rounded-2xl border-transparent border-2 shadow-2xl
         hover:border-blue-500">Users Count<span className="text-2xl font-bold">{totalUsers}</span></div>
        <div className="bg-gradient-to-r from-slate-200 to-white card flex flex-col justify-center items-center text-[18px] font-semibold p-4 w-[232px] h-[110px] rounded-2xl border-transparent border-2 shadow-2xl
         hover:border-blue-500">Mentors Pending<span className="text-2xl font-bold">{totalPendingMentors}</span></div>
        <div className="bg-gradient-to-r from-slate-200 to-white card flex flex-col justify-center items-center text-[18px] font-semibold p-4 w-[232px] h-[110px] rounded-2xl border-transparent  border-2 shadow-2xl 
         hover:border-blue-500">Roadmaps Created<span className="text-2xl font-bold">{totalRoadmaps}</span></div>
        <div className="bg-gradient-to-r from-slate-200 to-white card flex flex-col justify-center items-center text-[18px] font-semibold p-4 w-[232px] h-[110px] rounded-2xl border-transparent  border-2 shadow-2xl
         hover:border-blue-500">Business Ideas<span className="text-2xl font-bold">{totalBusinessIdeas}</span></div>
      </div>

      {/* Middle Section: Charts */}
      <div className="charts grid grid-cols-2 gap-6 mb-4">
        <div className="chart bg-gray-100  h-[400px] rounded shadow-2xl">
          <UsersPerCategoryChart/>
        </div>
        <div className="chart bg-gray-100  h-[350px] rounded shadow-2xl">
          <MentorDistributionChart/>
        </div>
      </div>
        <div className="quick-actions grid grid-cols-3 gap-4">
        <button className="bg-gradient-to-r from-blue-800 to-blue-600 text-white p-4 rounded" onClick={()=>navigate("/admin/roadmapform")}>Add Roadmap</button>
        <button className="bg-gradient-to-r from-blue-600 to-cyan-400 text-white p-4 rounded" onClick={navClick}>Add Category</button>
        <button className="bg-gradient-to-r from-cyan-400 to-blue-800 text-white p-4 rounded" onClick={()=>navigate("/admin/viewfeedback")}>View Reports</button>
      </div>
      </div>

      {/* Notifications Feed */}
     <div className="bg-white ml-5">
  <div className="p-5 mb-6 w-full h-[615px] border border-slate-200 rounded-2xl shadow-sm bg-gradient-to-b from-blue-500 to-cyan-400">

    {/* Header */}
    <div className="flex items-center justify-between pb-4 border-b  border-slate-200">
      <h2 className="text-xl font-semibold text-white">
        Notifications
      </h2>

      <span className="px-3 py-1 text-xs font-medium bg-blue-100 text-blue-700 rounded-full">
        1 New
      </span>
    </div>

    {/* Notification */}
    <div className="mt-5 ">
      <div className="flex items-start gap-4 p-4 bg-white border border-slate-200 rounded-xl hover:shadow-md transition-all duration-200 cursor-pointer">

        <div className="w-3 h-3 bg-blue-600 rounded-full mt-2"></div>

        <div className="flex-1">
          <p className="text-slate-800 font-medium">
            New mentor registration received.
          </p>

          <p className="text-sm text-slate-500 mt-1">
            2 minutes ago
          </p>
        </div>

      </div>
    </div>

  </div>
</div>
      </div>

  
    
    </div>
  );
};

export default AdminDashboard;



