import React from 'react'
import UserProfileForm from '../../components/Common/Userprofileform'
import { useState,useEffect } from 'react';
import  axios  from 'axios';
import { useNavigate } from 'react-router-dom';
import {motion} from "framer-motion"

function Userprofilecreation() {
  const navigate=useNavigate();
  const [formData, setFormData] = useState({
      fullName: "",
      name: "",
      email: "",
      phone: "",
      location: "",
      skills: "",
      interests: "",
      experienceLevel: "Beginner",
      privacy: "Public",
      category:"",
      notifications: {
        email: true,
        inApp: true,
        sms: false,
      },
      profilePicture: null,
      profileBanner: null,
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
    }else if (name.includes("notifications")) {
      const key = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        notifications: { ...prev.notifications, [key]: checked },
      }));
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
    formdata.append("username",formData.name);
    formdata.append("email",formData.email);
    formdata.append("phone",formData.phone);
    formdata.append("location",formData.location);
    formdata.append("skills",formData.skills);
    formdata.append("interests",formData.interests);
    formdata.append("experienceLevel",formData.experienceLevel);
    formdata.append("privacy",formData.privacy);
    formdata.append("category",formData.category);
    formdata.append("notifications",JSON.stringify(formData.notifications))
    console.log(formdata);
    try {
      const token = localStorage.getItem("token");

      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/users/profilecreate`,
        formdata,
        {
          headers: {"Content-Type":"multipart/form-data","Authorization": `Bearer ${token}` }
        }
      );
      const createdProfileId=res.data.profile._id;
      navigate(`/user/profile/${createdProfileId}`);

      console.log("Profile created:", res.data);
      alert("Profile created successfully!");
    } catch (error) {
      console.error("Profile creation failed:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Error creating profile");
    }
  };
  return (
    <motion.div initial={{scale:0,opacity:0}} animate={{scale:1,opacity:1}} transition={{duration:0.5}}>
      <UserProfileForm  title="create your profile" formData={formData} preview1={preview1} preview2={preview2} handleChange={handleChange} handleSubmit={handleSubmit}/>
    </motion.div>
  )
}

export default Userprofilecreation