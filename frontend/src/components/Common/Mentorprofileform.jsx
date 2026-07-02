import React, { useState ,useEffect} from "react";
import axios from "axios";
import banner from "../../assets/user_images/banner.webp"
import profile from "../../assets/user_images/profile.jpg"

const MentorProfileForm = ({title,preview1,preview2,handleChange,handleSubmit,formData}) => {
    const[category,setCategory]=useState([])

    useEffect(()=>{
        const fetchCategory=async()=>{
          try{
          const res=await axios.get(`${import.meta.env.VITE_API_URL}/api/admin/getcategory`);
          setCategory(res.data);
          }catch(error){
            console.log(error);
          }
          
          
        }
        fetchCategory();
      },[]);
  



  return (
    <form
      onSubmit={handleSubmit}
      className="w-[1100px] mx-auto p-10 bg-white shadow-md rounded-lg space-y-4 mt-10"
    >
        
      <h2 className="text-2xl font-bold text-gray-700">Mentor Profile</h2>
      <div className="flex gap-10">
        <div className="w-[500px]">
      <div>
       
             {preview1 ? <img src={preview1} className="w-32 h-32 object-cover rounded-full mt-2" />:<img src={profile} className="w-32 h-32 object-cover rounded-full mt-2" />}
            <input type="file" name="profilePicture" onChange={handleChange} className="file:mr-1 file:rounded-full file:border-0 file:bg-blue-500 file:text-white
            file:px-4 file:py-2 file:text-sm file:font-semibold hover:file:text-blue-500 hover:file:bg-white duration-300"/>
           
             </div>

      {/* Full Name */}
      <div>
        <label className="block text-sm font-medium text-gray-600">Full Name</label>
        <input
          type="text"
          name="fullName"
          value={formData?.fullName||""}
          onChange={handleChange}
          className="w-full border rounded-md p-2 mt-1"
          required
        />
      </div>

      {/* Profile Picture */}
    
      <div>
          <label className="block font-medium">Username</label>
          <input
            type="text"
            name="name"
            value={formData?.name ||""}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2  border-gray-400"
          />
        </div>

        <div>
          <label className="block font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={formData?.email ||""}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2  border-gray-400"
          />
        </div>
     
      

      {/* Bio */}
      <div>
        <label className="block text-sm font-medium text-gray-600">Bio</label>
        <textarea
          name="bio"
          value={formData?.bio ||""}
          onChange={handleChange}
          className="w-full border rounded-md p-2 mt-1"
          rows="4"
        />
      </div>
     
      </div>
        <div className="w-[500px]">
       <div>

              {preview2 ? <img src={preview2} className="w-[450px] h-27 object-cover  mt-2 mb-5 rounded-xl"/>: <img src={banner} className="w-[450px] h-27 object-cover  rounded-xl mt-2 mb-5"/>}
            <input type="file" name="profileBanner" onChange={handleChange} className="file:mr-1 file:rounded-full file:border-0 file:bg-violet-500 file:text-white
            file:px-4 file:py-2 file:text-sm file:font-semibold hover:file:text-violet-500 hover:file:bg-white duration-300"/>
           
             </div>

       <div>
        <label className="block text-sm font-medium text-gray-600">phone</label>
        <input
          type="text"
          name="phone"
          value={formData?.phone ||""}
          onChange={handleChange}
          className="w-full border rounded-md p-2 mt-1"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-600">location</label>
        <input
          type="text"
          name="location"
          value={formData?.location ||""}
          onChange={handleChange}
          className="w-full border rounded-md p-2 mt-1"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-600">Expertise Areas (comma separated)</label>
        <select
            name="category"
            value={formData?.category ||""}
            onChange={handleChange}
            className="w-[70%] border rounded px-3 py-2 mt-1  border-gray-400"
          >
            <option value="">select a category</option>
            {category.map((m)=>(
               <option value={m._id}>{m.name}</option>
            ))}
           
            
          </select>
      </div>

      {/* Skills */}
      <div>
        <label className="block text-sm font-medium text-gray-600">Skills (comma separated)</label>
        <input
          type="text"
          name="skills"
          value={formData?.skills ||""}
          onChange={handleChange}
          className="w-full border rounded-md p-2 mt-1"
        />
      </div>

      {/* Experience Years */}
      <div>
        <label className="block text-sm font-medium text-gray-600">Experience (Years)</label>
        <input
          type="number"
          name="experience"
          value={formData?.experience ||""}
          onChange={handleChange}
          className="w-full border rounded-md p-2 mt-1"
          required
        />
      </div>
      <button 
        type="submit"
        className="w-[200px] bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 mt-5"
      >
        {title}
      </button>
      </div>
      </div>
    </form>
  );
};

export default MentorProfileForm
