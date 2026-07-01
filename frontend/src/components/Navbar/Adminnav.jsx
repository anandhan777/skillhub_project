
// src/components/Navbar/HomeNavbar.jsx
import { NavLink } from "react-router-dom";

export default function Adminnav() {
  return (
    <div className="flex text-white w-full px-6 py-4 items-center fixed" style={{backgroundColor:"#0e2136"}}>
      <h1 className="text-xl font-bold pl-15">SkillHub</h1>
      <div className="">
        <NavLink to="/admin" className=" ml-[680px] duration-300  hover:bg-cyan-300 hover:text-blue-900 duration-300 py-2 px-3 rounded-full">Home</NavLink>
        <NavLink to="/admin/addidea" className="duration-300 hover:bg-cyan-300 hover:text-blue-900 duration-300 py-2 px-3 rounded-full">Add businessidea</NavLink>
        <NavLink to="/admin/addresource" className="duration-300 hover:bg-cyan-300 hover:text-blue-900 duration-300 py-2 px-3 rounded-full">Add resources</NavLink>
        <NavLink to="/admin/viewusers" className="duration-300 hover:bg-cyan-300 hover:text-blue-900 duration-300 py-2 px-3 rounded-full">view users</NavLink>
        <NavLink to="/admin/viewmentors" className="duration-300 hover:bg-cyan-300 hover:text-blue-900 duration-300 py-2 px-3 rounded-full">Mentors</NavLink>
          <NavLink to="/"> <button  className="bg-transparent shadow-[0_0_10px_rgba(59,130,246,0.7)] hover:bg-white  hover:text-blue-900 text-white duration-400 w-[100px] py-2 px-4 rounded-3xl  ml-4" style={{border:"1px solid #00c3ff",boxshadow:"0 4px 12px rgba(0, 0, 255, 0.6)"}}>Logout</button> </NavLink>
        </div>
    </div>
  );
}
