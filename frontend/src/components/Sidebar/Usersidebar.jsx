// src/components/Sidebar/HomeSidebar.jsx
import { NavLink } from "react-router-dom";
import { useRef,useState,useEffect } from "react";
import gsap from "gsap";
import {FaBars} from "react-icons/fa";
import { RiRoadMapLine } from "react-icons/ri";
import { MdPerson } from "react-icons/md";
import { FaCog } from "react-icons/fa";

import { FaComments,FaStar ,FaUserFriends } from "react-icons/fa";  
import { IoNotifications } from "react-icons/io5"; 
import { MdFeedback } from "react-icons/md";       



export default function Usersidebar({users}) {
 
  const sidebarRef = useRef(null);

  
 const user=JSON.parse(localStorage.getItem("user"));
  const[expanded, setExpanded] = useState(true);
  const menuItems=[
      {icon:user.isProfile?(<div className=" -ml-2 rounded-full w-12 h-12 border-1 border-white" ><img src={`
${import.meta.env.VITE_API_URL}${users.profile.profilePicture}`} className="w-12 h-12 rounded-full object-cover"/></div>):
      (<div className="rounded-full object-cover w-12 h-12"><img src={`
${import.meta.env.VITE_API_URL}${users.profilePicture}`} className="w-12 h-12 rounded-full object-cover"/></div>),label:user.isProfile?(<div className="text-white text-xl">{users.profile.fullName}</div>):"Profile",link:"/user/profileme"},
    {icon:<MdPerson/>,label:"Dashboard",link:"/user/dashboard"}, 
    {icon:<RiRoadMapLine/>,label:"Roadmap",link:"/user/roadmap"},
    {icon:<IoNotifications/>,label:"notification",link:"/user/notification"},
     {icon:<FaUserFriends/>,label:"conections",link:"/user/connectedpeople"},
     {icon:<FaComments/>,label:"chat",link:`/user/chatpage`},
     {icon:<MdFeedback/>,label:"feedback",link:`/user/feedback`},
  ]

  const togglesidebar=()=>{
    if(expanded){
      gsap.to(sidebarRef.current,{width:"250px" ,duration:0.3,ease:"power2.Out"});
      

    }
    else{
      gsap.to(sidebarRef.current,{width:"70px" ,duration:0.3,ease:"power2.Out"});
     
    }
    setExpanded(!expanded);
  }
  return (
    <aside className=" fixed z-20  w-[70px] h-screen p-3" style={{ backgroundColor:"#142d4a" }} ref={sidebarRef}>
      
      <button onClick={togglesidebar}>
        <h2 className="text-lg pt-3 pb-7 pl-3 text-white font-semibold mb-4 " ><FaBars /></h2>
      </button>
      
        <ul >
          {menuItems.map((item, index) => (
            <li
              key={index}>
            <NavLink to={item.link} className={`flex items-center  rounded gap-2  hover:bg-gray-200 text-white hover:text-[#142d4a] duration-300`}>
              
              <span className="text-[27px] pr-2 p-3 py-2 pl-2">{item.icon}</span>
              {!expanded ?(<span>{item.label}</span>):null}
              </NavLink>
            </li>
          ))}
        </ul>
        
    </aside>
  );
}