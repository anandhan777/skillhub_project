// src/components/Sidebar/HomeSidebar.jsx
import { NavLink } from "react-router-dom";
import { useRef,useState } from "react";
import gsap from "gsap";
import {FaBars} from "react-icons/fa";
import { RiRoadMapLine } from "react-icons/ri";
import { MdPerson } from "react-icons/md";
import { FaCog } from "react-icons/fa";
import { FaComments,FaStar ,FaUserFriends,FaUpload } from "react-icons/fa";       // Chat
import { IoNotifications } from "react-icons/io5"; // 
import { MdFeedback } from "react-icons/md";     
import profile from "../../assets/user_images/profile.jpg"

export default function Mentorsidebar({users}) {
  const sidebarRef = useRef(null);
  const user=JSON.parse(localStorage.getItem("user"));
 
  const[expanded, setExpanded] = useState(true);
  const menuItems=[
     {icon:user.isProfile?(<div className=" -ml-2 rounded-full w-12 h-12 border-1 border-white" ><img src={`http://localhost:5000${users.profile.profilePicture}`} className=" w-12 h-12 rounded-full object-cover"/></div>):
      (<div className="-ml-2 rounded-full w-12 h-12 border-1 border-white"><img src={profile} className="rounded-full" /></div>),label:user.isProfile?(<div className="text-white text-xl">{users.profile.fullName}</div>):"Profile",link:"/mentor/profileme"},
    {icon:<MdPerson/>,label:"Dashboard",link:"/mentor/dashboard"},
    {icon:<FaComments/>,label:"chat",link:`/mentor/chatpage`},
    {icon:<IoNotifications/>,label:"notification",link:`/mentor/notification`},
    {icon:<FaUpload/>,label:"upload session",link:`/mentor/uploadsession`},
    {icon:<FaUserFriends/>,label:"connections",link:`/mentor/connections`},
    {icon:<MdFeedback/>,label:"feedback",link:`/mentor/feedback`},
    {icon:<FaStar/>,label:"reviews",link:`/mentor/reviewlist`}
  ]

  const togglesidebar=()=>{
    if(expanded){
      gsap.to(sidebarRef.current,{width:"250px" ,duration:0.5,ease:"power2.Out"});
      

    }
    else{
      gsap.to(sidebarRef.current,{width:"70px" ,duration:0.5,ease:"power2.Out"});
     
    }
    setExpanded(!expanded);
  }
  return (
    <aside className=" fixed z-20  w-[70px] h-screen p-3" style={{backgroundColor:"#142d4a"}} ref={sidebarRef}>
      <button onClick={togglesidebar}>
        <h2 className="text-lg pt-3 pb-7 pl-3 text-white font-semibold mb-4" ><FaBars /></h2>
      </button>
      
        <ul >
          {menuItems.map((item, index) => (
            <li
              key={index}>
            <NavLink to={item.link} className="flex items-center justify-items-end  p-2 rounded gap-2 hover:bg-gray-200 text-white hover:text-[#142d4a] duration-300">
           
              <span className="text-[27px]">{item.icon}</span>
              {!expanded && <span>{item.label}</span>}
              </NavLink>
            </li>
          ))}
        </ul>
    </aside>
  );
}