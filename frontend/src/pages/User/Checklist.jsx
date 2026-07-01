import React from 'react'
import {useState,useEffect} from "react"
import axios from "axios"
import { NavLink } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';


function Checklist() {
    const [checklists,setChecklists]=useState([]);
    const[search,setSearch]=useState("");
    const[activenav,setActivenav]=useState("checklist");

    useEffect(()=>{
        const fetchChecklist=async()=>{
        try{
            const res=await axios.get("http://localhost:5000/api/users/checklists");
            setChecklists(res.data);
            console.log(res.data);
        }catch(error){
            console.log(error);
            
        }
    }
    fetchChecklist();
},[])
const searchChecklist=()=>{
  setChecklists(prev=>prev.filter(m=>m.title===search));
}
  return (
    <div><div className="min-h-screen bg-gray-50 p-26 ">
       <div >
              <nav className="text-gray-600  flex gap-5">
                <NavLink to="/user/learning/video" onClick={()=>setActivenav("video")} className={`${activenav==="video" ? " text-blue-600  border-b-2 border-blue-600":"border-b-2 border-gray-600 text-gray-600 "}`}>video</NavLink>
                <NavLink to="/user/learning/article" onClick={()=>setActivenav("article")} className={`${activenav==="article" ? " text-blue-600 border-b-2 border-blue-600":"border-b-2 border-gray-600 text-gray-600 "}`}>Article</NavLink>
                <NavLink to="/user/checklist" onClick={()=>setActivenav("checklist")} className={`${activenav==="checklist" ? " text-blue-600 border-b-2 border-blue-600":"border-b-2 border-gray-600 text-gray-600 "}`}>checklist</NavLink>
              </nav>
            </div>
  <div className="max-w-7xl mx-auto">

    {/* Header */}
    <div className="mb-8">
      <h1 className="text-3xl font-bold text-gray-800 text-center">
        Checklists
      </h1>
      <p className="text-gray-500 mt-2 text-center">
        Browse all uploaded checklists and track important tasks.
      </p>
    </div>

    {/* Search */}
    <div className="mb-6 flex relative justify-end">
      <input
        type="text" value={search}
        placeholder="Search checklist..." onChange={(e)=>setSearch(e.target.value)}
        className="w-full bg-white border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-900"
      />
      <button onClick={searchChecklist} className="absolute  p-3 text-2xl"><FaSearch/></button>
    </div>

    {/* Checklist Cards */}
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

      {checklists.map((checklist) => (
        <div
          key={checklist._id}
          className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 p-6"
        >

          {/* Title */}
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            {checklist.title}
          </h2>

          {/* Description */}
          <p className="text-gray-600 text-sm mb-4 line-clamp-3">
            {checklist.description}
          </p>

          {/* Total Items */}
          <div className="mb-4">
            <span className="bg-blue-100 text-blue-900 px-3 py-1 rounded-full text-xs font-medium">
              {checklist.checklistItems.length} Items
            </span>
          </div>

          {/* Checklist Preview */}
          <div className="space-y-2 mb-5">
            {checklist.checklistItems.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-2 text-sm text-gray-700"
              >
                <input
                  type="checkbox"
                  disabled
                  className="w-4 h-4"
                />
                <span>{item}</span>
              </div>
            ))}
          </div>

          {/* Button */}
          <button
            className="w-full bg-blue-900 text-white py-2.5 rounded-lg hover:bg-blue-800 transition"
          >
            View Checklist
          </button>

        </div>
      ))}

    </div>
  </div>
</div></div>
  )
}

export default Checklist