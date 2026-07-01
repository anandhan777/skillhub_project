import React from 'react'
import {useState,useEffect} from "react"
import {useForm} from "react-hook-form"
import axios from "axios"

const StepOne = ({nextStep,formdata,setFormdata}) => {

    const {register,handleSubmit,formState:{errors}}=useForm({defaultValues:{
        name:formdata.name,
        category:formdata.category,
    }});

    const[category1,setCategory1]=useState([]);
  useEffect(()=>{
    const fetchCategory=async()=>{
      try{
      const res=await axios.get("http://localhost:5000/api/admin/getcategory");
      setCategory1(res.data);
      }catch(error){
        console.log(error);
      }
      
      
    }
    fetchCategory();
  },[]);

    const onSubmit=(data)=>{
        setFormdata((pre)=>({...pre,...data}));
    nextStep();


    }
  return (
  
        <form 
  onSubmit={handleSubmit(onSubmit)} 
  className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg space-y-4"
>
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">roadmap title</label>
    <input 
      type="text" 
      placeholder="Enter your roadmap" 
      {...register("name",{required:"Name is required"})} 
      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    <p className="text-red-500 text-sm mt-1">{errors.name?.message}</p>
  </div>

  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
    <select
  {...register("category", { required: "Email is required" })}
  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
>
  <option value="">Select category</option>
   {category1.map((m)=>(
               <option value={m._id}>{m.name}</option>
            ))}
           

</select>
<p className="text-red-500 text-sm">{errors.email?.message}</p>
  </div>

  <button 
    type="submit" 
    className="w-full bg-[#003152] text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200"
  >
    Next
  </button>
</form>

  )
}

export default StepOne