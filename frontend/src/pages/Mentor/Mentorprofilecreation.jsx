import React from 'react'
import MentorProfileForm from '../../components/Common/Mentorprofileform'
import {useState,useEffect}from "react"
import axios from "axios"
import { useNavigate } from 'react-router-dom'
import {motion} from "framer-motion"
function Mentorprofilecreation() {
    const [formData, setFormData] = useState({
    fullName: "",
    profilePicture: null,
    profileBanner: null,
    email:"",
    name:"",
    bio: "",
    phone:"",
    location:"",
    category: "",
    skills: "",
    experience: "",

  });

  const[preview1,setPreview1]=useState(null);
      const[preview2,setPreview2]=useState(null);
      
  
    useEffect(() => {
      const userstr =localStorage.getItem("user");
      if (userstr) {
        try{
        const user = JSON.parse(userstr);
       
        console.log("Loaded user:",user);
        setFormData((prev) => ({
          ...prev,
          name: user.name,
          email: user.email
        }));
      }catch(error){
        console.log(error);
        
      }
      }
    }, []);
     const navigate=useNavigate();

    const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
   
    if (type==="file"){
        const file=files[0];
        if(name==="profilePicture"){
            setFormData((pre)=>({...pre, profilePicture: file}));
            setPreview1(URL.createObjectURL(file));
        }
        if(name==="profileBanner"){
            setFormData((pre)=>({...pre, profileBanner: file}));
            setPreview2(URL.createObjectURL(file));
        }
   
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
     const userstr =localStorage.getItem("user");
    if (userstr) {
      try{
      const user = JSON.parse(userstr);
      user.isProfile=true; // ✅ parse back into object
      localStorage.setItem("user",JSON.stringify(user));
      }catch(err){
        console.log(err);
      }
    }
      
    const formdata=new FormData();
    formdata.append("profilePicture",formData.profilePicture);
    formdata.append("profileBanner",formData.profileBanner);
    formdata.append("fullName",formData.fullName);
    formdata.append("name",formData.name);
    formdata.append("email",formData.email);
    formdata.append("bio",formData.bio);
    formdata.append("phone",formData.phone);
    formdata.append("location",formData.location);
    formdata.append("skills",formData.skills);
    formdata.append("experience",formData.experience);
    formdata.append("category",formData.category);
  
    console.log(formdata);
    try {
      const token = localStorage.getItem("token");

      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/mentor/creatementorprofile`,
        formdata,
        {
          headers: {"Content-Type":"multipart/form-data","Authorization": `Bearer ${token}` }
        }
      );
      console.log("Profile created:", res.data);
      alert("Profile created successfully!");
      navigate("/mentor/profileview");
    } catch (error) {
      console.error("Profile creation failed:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Error creating profile");
    }
  };
  return (
    <motion.div initial={{scale:0,opacity:0}} animate={{scale:1,opacity:1}} transition={{duration:0.5}}><MentorProfileForm title="create profile" formData={formData} handleChange={handleChange} handleSubmit={handleSubmit} preview1={preview1} preview2={preview2}/></motion.div>
  )
}

export default Mentorprofilecreation