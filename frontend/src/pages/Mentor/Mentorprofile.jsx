import React from 'react'
import {useNavigate} from "react-router-dom";
import {useEffect} from "react"
import axios from "axios"

function Mentorprofile() {
    const navigate=useNavigate();
    useEffect(()=>{
       const user=JSON.parse(localStorage.getItem("user"));
       console.log(user);
       const token=localStorage.getItem("token");
       const fetch=async()=>{
     
       }
       fetch();
        if(user.isProfile){
        navigate(`/mentor/profileview`);
       }
       else{
        navigate("/mentor/profilecreate");
       }
      },[]);
    
        
    
  return (
    <div>
loading...

    </div>
  )
}

export default Mentorprofile