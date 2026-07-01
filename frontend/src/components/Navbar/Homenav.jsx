
// src/components/Navbar/HomeNavbar.jsx
import { NavLink } from "react-router-dom";

export default function Homenav() {
  return (
    <div className="flex text-white px-6 py-4  items-center" style={{backgroundColor:"#0e2136"}}>
      <h1 className="text-xl font-bold pl-8">SkillHub</h1>
      <div className="">
        <NavLink to="/" className=" ml-[800px] px-3 py-2  hover:bg-cyan-500 hover:text-blue-900 duration-300 rounded-full">Home</NavLink>
        <NavLink to="/about" className="px-3 py-2  hover:bg-cyan-500 hover:text-blue-900 duration-300 rounded-full">About</NavLink>
        <NavLink to="/category" className="px-3 py-2  hover:bg-cyan-500 hover:text-blue-900 duration-300 rounded-full">category</NavLink>
        <NavLink to="/mentorsection" className="px-3 py-2  hover:bg-cyan-500 hover:text-blue-900 duration-300 rounded-full">Mentors</NavLink>
       <NavLink to="/login"> <button  className="bg-transparent shadow-[0_0_10px_rgba(59,130,246,0.7)] hover:bg-white text-white duration-400 w-[100px] py-2 px-4 rounded-3xl hover:text-blue-900 ml-4" style={{border:"1px solid #00c3ff",boxshadow:"0 4px 12px rgba(0, 0, 255, 0.6)"}}>Login</button> </NavLink>
        <NavLink to="/signup"> <button  className="bg-transparent shadow-[0_0_10px_rgba(59,130,246,0.7)] hover:bg-white text-white w-[100px] py-2 px-4 rounded-3xl hover:text-blue-900" style={{border:"1px solid #00c3ff"}}>Sign Up</button> </NavLink>
      </div>
    </div>
  );
}
