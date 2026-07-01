import React, { useState,useRef ,useEffect} from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import axios from "axios";
import "./Signup.css"
import {motion} from "framer-motion"
import google from "../../assets/Home_images/googleicon.png"


function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role:"user"
  });
  const[userdata,setUserdata]=useState({});
  const navigate=useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    setFormData({name:"",email:"",password:"",role:"user"});
    navigate("/login");
    try{
      const res=await axios.post("http://localhost:5000/api/users/register",formData);
      const token=res.data.token
      setUserdata(res.data.user);
    
      console.log("Signup Data:",res.data);
      localStorage.setItem('token',token);
    }catch(error){
      console.error("user registration failed:",error.response?.data||error.message);
    }
    // Add signup logic here (API call, validation, etc.)
  };
  const boxRef=useRef(null);
  useEffect(() => {
    gsap.to(boxRef.current, {
      borderColor: "#00c3ff",
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "linear",
      keyframes: [
        { borderColor: "#00c3ff" },
        { borderColor: "violet" },
        { borderColor: "#cc00ff" },
        { borderColor: "violet" },
      ],
    });
  }, []);
   const handleGoogleLogin = () => {
    // Redirect user to backend Google auth route
     localStorage.setItem("user",JSON.stringify(userdata));
    window.location.href = "http://localhost:5000/api/auth/google";
  };

  return (
    <div className="body h-screen relative">
      <motion.div initial={{scale:0.8,opacity:1,y:50}} animate={{scale:1,y:0}} transition={{duration:0.5}}>
    <div className={`signupbox h-[520px] w-[400px] bg-[#142d4a] rounded-4xl shadow-lg`} ref={boxRef}>
    <form onSubmit={handleSubmit} className="signup-form">
        <div className="flex flex-col items-center justify-center gap-6">
      <h2 className="text-white font-semibold text-2xl pt-7">Signup</h2>
      <input className="w-[350px] border-2 h-10 border-white rounded-full text-white pl-4"
        type="text"
        name="name"
        placeholder="Name"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <input className="w-[350px] border-2 h-10 border-white rounded-full text-white pl-4"
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
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
      <select name="role" className="w-[300px]  h-8 bg-blue-400 border-none rounded-xl text-white" value={formData.role} onChange={handleChange}>
        <option value="user">User</option>
        <option value="mentor">Mentor</option>
      </select>
      <div className="flex flex-col items-center justify-center gap-2">
      <h1 className="text-white">if you already have an acccount?, <NavLink to="/login"><span className="text-blue-400">login</span></NavLink></h1>
      <button className=" w-[100px] bg-gradient-to-r from-blue-400 to-blue-700 text-white p-2 rounded-full" type="submit">Signup</button>
      {formData.role==="user" ?(
        <div>
      <h1 className="text-white text-center">or</h1>
      <button onClick={handleGoogleLogin} className=" w-[200px] bg-gradient-to-r from-green-400 to-blue-400 text-white  rounded-full flex items-center" type="submit"><img src={google} className="h-10 w-10"/>Signup with Google</button>
      </div>)
      :(null)}
      </div>
      </div>
      
    </form>
    </div>
    </motion.div></div>
  );
}
export default Signup