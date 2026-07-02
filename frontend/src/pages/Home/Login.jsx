//login.jsx
import React, { useState,useRef,useEffect } from "react";
import { NavLink} from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import gsap from 'gsap'
import "./Login.css"
import {motion} from "framer-motion";
import google from "../../assets/Home_images/googleicon.png"

function Login() {
  const [formData, setFormData] = useState({
    name: "",

    password: "",

  });
  const borderRef=useRef(null);
  const navigate=useNavigate();
 

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
    console.log("Signup Data:", formData);
    const res=await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/login`,formData) 
    console.log("login data:",res.data.role);
    console.log(res.data.role);
    
    localStorage.setItem("token",res.data.token);
    localStorage.setItem("user",JSON.stringify(res.data.user));
    if(res.data.role==="admin"){
      navigate("/admin");

    }
    
    else if(res.data.user.role==="user"){
      navigate("/user");
    } else if(res.data.user.role==="mentor"){
      navigate("/mentor");
    
    
    }}
    catch(error){
      alert("invalid login,Try again")
      console.error("Login failed:",error.response?.data||error.message);
    }
  };

  return (
    <div className="body h-screen">
     <motion.div initial={{scale:0.8,opacity:1,y:50}} animate={{scale:1,y:0}} transition={{duration:0.5}}>
    <div  className="loginbox  w-[400px] h-[395px]  bg-[#142d4a] rounded-4xl">
    <form onSubmit={handleSubmit} className="signup-form">
        <div className="flex flex-col items-center justify-center gap-6">
      <h2 className="text-white font-semibold text-2xl pt-7">Login</h2>
      <input className="w-[350px] border-2 h-10 border-white rounded-full text-white pl-4"
        type="text"
        name="name"
        placeholder="Name"
        value={formData.name}
        onChange={handleChange}
        required
      />
      
      <input className="w-[350px] border-2 h-10 border-white rounded-full text-white pl-4"
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        required
      />
     
      <button className=" w-[100px] bg-gradient-to-r from-blue-400 to-blue-700 text-white p-2 rounded-full" type="submit">login</button>
      <h1 className="text-white">if you don't have an account, <NavLink to="/signup"><span className="text-blue-400">please signup</span></NavLink></h1>
     
      {/* <button onClick={handleGoogleLogin} className=" w-[200px] bg-gradient-to-r from-green-400 to-blue-400 text-white rounded-full flex items-center" type="submit"><img src={google} className="h-10 w-10"/>Signup with Google</button> */}
      </div>
    </form>
    </div>
    </motion.div></div>

  );
}
export default Login