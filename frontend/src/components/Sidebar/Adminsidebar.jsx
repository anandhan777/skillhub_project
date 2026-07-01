// src/components/Sidebar/HomeSidebar.jsx
import { NavLink } from "react-router-dom";
import { useRef,useState } from "react";
import gsap from "gsap";
import {FaBars} from "react-icons/fa";
import { RiRoadMapLine } from "react-icons/ri";
import { MdPerson } from "react-icons/md";
import { FaCog } from "react-icons/fa";

export default function AdminSidebar() {
  const sidebarRef = useRef(null);
 
  const[expanded, setExpanded] = useState(true);
  const menuItems=[{icon:<MdPerson/>,label:"Dashboard",link:"/admin"},
    {icon:<FaCog/>,label:"add category",link:"/admin/addcategory"}, 
    {icon:<RiRoadMapLine/>,label:"Roadmap",link:"/admin/roadmapform"},
    {icon:<RiRoadMapLine/>,label:"notification",link:"/admin/mentornotification"},
    {icon:<RiRoadMapLine/>,label:"feedbacks",link:"/admin/viewfeedback"},
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
    <aside className=" fixed z-10  w-[70px] h-screen p-4" style={{backgroundColor:"#142d4a"}} ref={sidebarRef}>
      <button onClick={togglesidebar}>
        <h2 className="text-lg pt-3 pb-7 p-3 text-white font-semibold mb-4" ><FaBars /></h2>
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