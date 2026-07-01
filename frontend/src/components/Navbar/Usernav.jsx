
// src/components/Navbar/HomeNavbar.jsx
import { NavLink } from "react-router-dom";

export default function Usernav() {
  return (
    <div className="flex text-white px-6 py-4  items-center fixed w-full z-10" style={{backgroundColor:"#0e2136"}}>
      <h1 className="text-xl font-bold pl-14">skillHub</h1>
      <div className="">
        <NavLink to="/" className=" ml-[620px] px-3 py-2  hover:bg-cyan-500 hover:text-blue-900 duration-300 rounded-full duration-300">Home</NavLink>
        <NavLink to="/user/user_business" className="px-3 py-2  hover:bg-cyan-500 hover:text-blue-900 duration-300 rounded-full duration-300">Bussiness ideas</NavLink>
        <NavLink to="/user/learning/video" className="px-3 py-2  hover:bg-cyan-500 hover:text-blue-900 duration-300 rounded-full duration-300">learning resources</NavLink>
        <NavLink to="/user/upcomingsession" className="px-3 py-2  hover:bg-cyan-500 hover:text-blue-900 duration-300 rounded-full duration-300">Upcoming sections</NavLink>
        <NavLink to="/user/viewmentors" className="px-3 py-2  hover:bg-cyan-500 hover:text-blue-900 duration-300 rounded-full duration-300">Mentors</NavLink>
          <NavLink to="/"> <button  className="bg-transparent shadow-[0_0_10px_rgba(59,130,246,0.7)] hover:bg-white text-white duration-400 w-[100px] py-2 px-4 rounded-3xl hover:text-blue-900 ml-4" style={{border:"1px solid #00c3ff",boxshadow:"0 4px 12px rgba(0, 0, 255, 0.6)"}}>Logout</button> </NavLink>
        </div>
    </div>
  );
}
