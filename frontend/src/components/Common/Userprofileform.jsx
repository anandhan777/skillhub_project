
import { useEffect, useState } from "react";
import axios from "axios";
import banner from "../../assets/user_images/banner.webp"
import profile from "../../assets/user_images/profile.jpg"


export default function UserProfileForm({ title,formData,handleChange,handleSubmit,preview1,preview2 }) {
 const[category,setCategory]=useState([]);
  useEffect(()=>{
    const fetchCategory=async()=>{
      try{
      const res=await axios.get("http://localhost:5000/api/admin/getcategory");
      setCategory(res.data);
      }catch(error){
        console.log(error);
      }
      
      
    }
    fetchCategory();
  },[]);
  
 

  

  return (
    
    <div className="  max-w-6xl  mt-6 mx-auto bg-white shadow-md rounded-lg p-6 px-20 mt-25 ">
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        
        {/* Basic Info */}
        <div className="flex">
          <div className="w-[70%]">
        <div className="flex items-center">
          <div>
             {preview1 ? <img src={preview1} className="w-32 h-32 object-cover rounded-full mt-2" />:<img src={profile} className="w-32 h-32 object-cover rounded-full mt-2" />}
            <input type="file" name="profilePicture" onChange={handleChange} className="file:mr-1 file:rounded-full file:border-0 file:bg-blue-600 file:text-white
            file:px-4 file:py-2 file:text-sm file:font-semibold hover:file:text-blue-500 hover:file:bg-white duration-300"/>
           
             </div>
             
        </div>
        <div>
          <label className="block font-medium">Full Name</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className="w-[80%] border rounded px-3 py-2 border border-cyan-200 rounded-xl p-3
              focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
         
        </div>

        <div>
          <label className="block font-medium">Username</label>
          <input
            type="text"
            name="username"
            value={formData.name}
            onChange={handleChange}
            className="w-[80%] border rounded px-3 py-2  border border-cyan-200 rounded-xl p-3
              focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
        </div>

        <div>
          <label className="block font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-[80%] border rounded px-3 py-2  border border-cyan-200 rounded-xl p-3
              focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
        </div>

        <div>
          <label className="block font-medium">Phone</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-[80%] border rounded px-3 py-2   border border-cyan-200 rounded-xl p-3
              focus:outline-none focus:ring-2 focus:ring-cyan-500"/>
        </div>

        <div>
          <label className="block font-medium">Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-[80%] border rounded px-3 py-2   border border-cyan-200 rounded-xl p-3
              focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
        </div>
        </div>
        

        {/* Skills & Interests */}
        <div className="w-[75%] -ml-25 -mr-50">
          <div>
            {preview2 ? <img src={preview2} className="w-60 h-20 object-cover  mt-2 mb-12"/>: <img src={banner} className="w-[450px] rounded-xl h-28 object-cover  mt-2 mb-4"/>}
            </div>
          <input type="file" name="profileBanner" onChange={handleChange} className="file:rounded-full file:border-0 file:bg-cyan-500 file:text-white
            file:px-4 file:py-2 file:text-sm file:font-semibold hover:file:text-blue-500  hover:file:bg-white"/>
            
        <div>
          <label className="block font-medium">Skills (comma separated)</label>
          <input
            type="text"
            name="skills"
            value={formData.skills}
            onChange={handleChange}
            className="w-[70%] border rounded px-3 py-2   border border-cyan-200 rounded-xl p-3
              focus:outline-none focus:ring-2 focus:ring-cyan-500"
            placeholder="e.g. Tailoring, React, Marketing"
          />
        </div>

        <div>
          <label className="block font-medium">Interests (comma separated)</label>
          <input
            type="text"
            name="interests"
            value={formData.interests}
            onChange={handleChange}
            className="w-[70%] border rounded px-3 py-2  border border-cyan-200 rounded-xl p-3
              focus:outline-none focus:ring-2 focus:ring-cyan-500"
            placeholder="e.g. Fashion, Food Business"
          />
        </div>

        <div>
          <label className="block font-medium">Experience Level</label>
          <select
            name="experienceLevel"
            value={formData.experienceLevel}
            onChange={handleChange}
            className="w-[70%] border rounded px-3 py-2   border border-cyan-200 rounded-xl p-3
              focus:outline-none focus:ring-2 focus:ring-cyan-500"
          >
            <option>Beginner</option>
            <option>Intermediate</option>
            <option>Advanced</option>
          </select>
        </div>

        {/* Settings */}
        <div>
          <label className="block font-medium">Privacy</label>
          <select
            name="privacy"
            value={formData.privacy}
            onChange={handleChange}
            className="w-[70%] border rounded px-3 py-2   border border-cyan-200 rounded-xl p-3
              focus:outline-none focus:ring-2 focus:ring-cyan-500"
          >
            <option>Public</option>
            <option>Private</option>
          </select>
        </div>

        {/* <div>
          <label className="block font-medium">Notifications</label>
          <div className="space-y-2">
            <label>
              <input
                type="checkbox"
                name="notifications.email"
                checked={formData.notifications.email}
                onChange={handleChange}
              /> Email
            </label>
            <label>
              <input
                type="checkbox"
                name="notifications.inApp"
                checked={formData.notifications.inApp}
                onChange={handleChange}
              /> In-App
            </label>
            <label>
              <input
                type="checkbox"
                name="notifications.sms"
                checked={formData.notifications.sms}
                onChange={handleChange}
              /> SMS
            </label>
          </div>
        </div> */}
         <div>
          <label className="block font-medium">category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-[70%] border rounded px-3 py-2   border border-cyan-200 rounded-xl p-3
              focus:outline-none focus:ring-2 focus:ring-cyan-500"
          >
            <option value="">select a category</option>
            {category.map((m)=>(
               <option value={m._id}>{m.name}</option>
            ))}
           
            
          </select>
        </div>

        {/* Submit */}
        <button 
          type="submit"
          className="bg-gradient-to-r from-blue-400 to-blue-700 text-white px-4 py-2 rounded hover:bg-gradient-to-r mt-5 hover:from-blue-800 hover:to-blue-500 transition duration-400"
        >
          {title === "create profile" ? "Create Profile" : "Update Profile"}
        </button>
        </div></div>
      </form>
    </div>
  );
}
