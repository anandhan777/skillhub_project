import React from 'react'
import Usernav from '../components/Navbar/Usernav'
import {Outlet} from 'react-router-dom'   
import Usersidebar from '../components/Sidebar/Usersidebar'
import Businessidea from '../pages/User/Businessidea'
import {useState,useEffect} from "react"
import axios from "axios"



const UserLayout = () => {
   const[users,setUsers]=useState({
    user:{},
    profile:{},
   });
useEffect(() => {
    const user=JSON.parse(localStorage.getItem("user"));
    
    const fetchProfile=async()=>{
      try{
      const token=localStorage.getItem("token");
      const res=await axios.get(`${import.meta.env.VITE_API_URL}/api/users/profileview`,{
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
            <Usersidebar users={users}/>
            
            <div className="flex-1">
                <Usernav/>
                
                   <Outlet/>
                </div>
        </div>
  )
}

export default UserLayout