
// src/components/Navbar/HomeNavbar.jsx
import { NavLink } from "react-router-dom";

export default function Mentornav() {
  return (
    <div className="flex text-white px-6 py-4 items-center fixed w-full z-10" style={{backgroundColor:"#0e2136"}}>
      <h1 className="text-xl font-bold pl-15">SkillHub</h1>
      <div className="">
        <NavLink to="/mentor" className=" ml-[680px] px-3 py-2  hover:bg-cyan-500 hover:text-blue-900 duration-300 rounded-full ">Home</NavLink>
        <NavLink to="/mentor/add_businessidea" className="px-3 py-2  hover:bg-cyan-500 hover:text-blue-900 duration-300 rounded-full">add businessidea</NavLink>
        <NavLink to="/mentor/add_resource" className="px-3 py-2  hover:bg-cyan-500 hover:text-blue-900 duration-300 rounded-full">add Resource</NavLink>
        <NavLink to="/mentor/viewsession" className="px-3 py-2  hover:bg-cyan-500 hover:text-blue-900 duration-300 rounded-full ">view session</NavLink>
        <NavLink to="/mentor/viewmentor" className="px-3 py-2  hover:bg-cyan-500 hover:text-blue-900 duration-300 rounded-full">Mentors</NavLink>
          <NavLink to="/"> <button  className="bg-transparent shadow-[0_0_10px_rgba(59,130,246,0.7)] hover:bg-white  text-white duration-400 w-[100px] py-2 px-4 rounded-3xl hover:text-blue-900 ml-4" style={{border:"1px solid #00c3ff",boxshadow:"0 4px 12px rgba(0, 0, 255, 0.6)"}}>Logout</button> </NavLink>
        </div>
    </div>
  );
}
