import Mentorsidebar from "../components/Sidebar/Mentorsidebar";
import Mentornav from "../components/Navbar/Mentornav";
import{useState,useEffect} from "react"
import axios from "axios"
import {Outlet} from 'react-router-dom'

import React from 'react'

function MentorLayout() {
   const[users,setUsers]=useState({
      user:{},
      profile:{},
     });
  useEffect(() => {
      const user=JSON.parse(localStorage.getItem("user"));
      
      const fetchProfile=async()=>{
        try{
        const token=localStorage.getItem("token");
        const res=await axios.get(`${import.meta.env.VITE_API_URL}/api/mentor/mentorprofile`,{
            headers: {
              Authorization: `Bearer ${token}`, // or however you store it
            }},);
        setUsers(res.data);
        console.log(res.data);
        }
        catch(error){
          console.log(error);
        }
       
      }
       fetchProfile();
    },[]);
  return (
    <div className="flex">
      <Mentorsidebar users={users} />
      <div className="flex-1">
        <Mentornav />
    
          <Outlet />
        
      </div>
    </div>
  )
}

export default MentorLayout