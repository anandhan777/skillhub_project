import React from 'react'
import {useState,useEffeect} from "react"
import axios from "axios"
import { useForm } from 'react-hook-form'

function UploadingSession() {
    const {register,handleSubmit,reset}=useForm();
    const user=JSON.parse(localStorage.getItem("user"));   
const onSubmit=async(data)=>{
  const formdata=new FormData();
  formdata.append("title",data.title);
  formdata.append("description",data.description);
  formdata.append("banner",data.banner[0]);
  formdata.append("sessionLink",data.sessionLink);
  formdata.append("date",data.date);
  formdata.append("startingTime",data.startingTime);
  formdata.append("endingTime",data.endingTime);
    try {
       const res=axios.post(`http://localhost:5000/api/mentor/uploadingsession/${user.id}`,formdata,
         {
        headers: {
          "Content-Type": "multipart/form-data", // ensure JSON header
        },
      }
       ) 
       console.log(res.data)
    } catch (error) {
        console.log(error);
        
    }
  }    
  return (
    <div><div className="max-w-4xl mx-auto mt-20 bg-white rounded-xl shadow-2xl overflow-hidden">

  {/* Header */}
  <div className="bg-gradient-to-r from-[#0669b5] to-cyan-400 px-18 py-6">
    <h2 className="text-3xl font-bold text-white">
      Upload Upcoming Session
    </h2>    
  </div>

  {/* Form */}
  <form onSubmit={handleSubmit(onSubmit)}className="p-12 pt-4 space-y-2">

    {/* Session Title */}
    <div>
      <label className="block text-gray-700 font-semibold mb-2">
        banner
      </label>
      <input {...register("banner",{required:"banner is required"})}
        type="file"
        accept="image/*"
        placeholder="upload you banner"

        className="w-full px-4 py-3 border rounded-full border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0083ff]"
      />

      <label className="block text-gray-700 font-semibold mb-2">
        Session Title
      </label>
      <input {...register("title",{required:"title is required"})}
        type="text"
        placeholder="Enter session title"

        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0083ff]"
      />
    </div>

    {/* Description */}
    <div>
      <label className="block text-gray-700 font-semibold mb-2">
        Description
      </label>
      <textarea {...register("description",{required:"description is required"})}
        rows="3"
        placeholder="Describe what participants will learn..."
        className="w-full px-4 py-3 border border-gray-300 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-[#0083ff]"
      />
    </div>

    {/* Session Link */}
    <div>
      <label className="block text-gray-700 font-semibold mb-2">
        Session Link
      </label>
      <input {...register("sessionLink",{required:"link is required"})}
        type="url"
        placeholder="https://meet.google.com/..."
        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0083ff]"
      />
    </div>

    {/* Date */}
    <div>
      <label className="block text-gray-700 font-semibold mb-2">
        Session Date
      </label>
      <input {...register("date",{required:"data is required"})}
        type="date"
        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0083ff]"
      />
    </div>

    {/* Time Fields */}
    <div className="grid grid-cols-2 gap-6">

      <div>
        <label className="block text-gray-700 font-semibold mb-2">
          Starting Time
        </label>
        <input {...register("startingTime",{required:"time is required"})}
          type="time"
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0083ff]"
        />
      </div>

      <div>
        <label className="block text-gray-700 font-semibold mb-2">
          Ending Time
        </label>
        <input {...register("endingTime",{required:"time is required"})}
          type="time"
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0083ff]"
        />
      </div>

    </div>

    {/* Footer Buttons */}
    <div className="flex justify-end gap-4 pt-4">

      <button
        type="button"
        className="px-6 py-3 border-2 border-[#0083ff] text-[#0083ff] rounded-xl font-semibold hover:bg-blue-50 transition"
      >
        Cancel
      </button>

      <button
        type="submit"
        className="px-8 py-3  bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
      >
        Upload Session
      </button>

    </div>

  </form>
</div></div>
  )
}

export default UploadingSession