import React from 'react'
import UserProfileForm from '../../components/Common/Userprofileform'
import axios from 'axios'
import { useNavigate,useParams } from 'react-router-dom'
import {useState,useEffect} from "react"

function Userprofileupdate() {

  const [profileId,setProfileId]=useState("");
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
      

      useEffect(()=>{
        const fetchProfile=async()=>{
          try{
            const token=localStorage.getItem("token");
            console.log(token);
            const res=await axios.get("http://localhost:5000/api/users/profileview",{headers:{Authorization: `Bearer ${token}`}},);
            setProfileId(res.data.profile._id);
            console.log(res.data);
          }catch(error){
            console.log(error);
          }
        }
        fetchProfile();
      },[]);

      
      
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
    
    // const notification=async()=>{
    //   const token=localStorage.getItem("token");
    //   try{
    //     const res=axios.post("http://localhost:5000/api/users/profilenotification",{headers:{Authorization:`Bearer ${token}`}});
    //     console.log(res);
    //   }catch(error){
    //     console.log(error);
    //   }
    // }
    const handleSubmit = async(e) => {
      e.preventDefault();
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
       
        const res = await axios.put(
          `http://localhost:5000/api/users/profileupdate/${profileId}`,
          formdata,
          {
            headers: {"Content-Type":"multipart/form-data","Authorization": `Bearer ${token}` }
          }
        );
  
        console.log("Profile created:", res.data);
        alert("Profile created successfully!");
      } catch (error) {
        console.error("Profile creation failed:", error.response?.data || error.message);
        alert(error.response?.data?.message || "Error creating profile");
      }
    };
  return (
    <div>
      <UserProfileForm title="update profile"  formData={formData} preview1={preview1} preview2={preview2} handleChange={handleChange} handleSubmit={handleSubmit}/>
    </div>
  )
}

export default Userprofileupdate