import React from 'react'
import BusinessIdeaForm from '../Admin/Add_BusinessIdea'
import axios from "axios"
import {useState,useEffect} from "react"

function Mentor_businessIdea() {
      const initialState={
        title: "",
        description: "",
        category: "",
        requiredSkills: "",
        estimatedCost: "",
        tags: "",
        category: "",
        roadmapId: "",
        image: null,
      }
    
    
    const [formData, setFormData] = useState({initialState});
      const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (files) {
          setFormData({ ...formData, [name]: files[0] });
        } else {
          setFormData({ ...formData, [name]: value });
        }
      };
    
      const[category1,setCategory1]=useState([]);
      useEffect(()=>{
        const fetchCategory=async()=>{
          try{
          const res=await axios.get(`${import.meta.env.VITE_API_URL}/api/admin/getcategory`);
          setCategory1(res.data);
          }catch(error){
            console.log(error);
          }
          
          
        }
        fetchCategory();
      },[]);
    
      const handleSubmit = async(e) => {
        e.preventDefault();
    
        const formdata= new FormData();
        formdata.append("title",formData.title);
        formdata.append("description",formData.description);
        formdata.append("category",formData.category);
        formdata.append("requiredSkills",formData.requiredSkills);
        formdata.append("estimatedCost",formData.estimatedCost);
        formdata.append("tags",formData.tags);
        
       
        formdata.append("image",formData.image);
    
        try{
         
        const res= await axios.post(`${import.meta.env.VITE_API_URL}/api/mentor/addbusiness_idea`,formdata,{headers:
          {"Content-Type":"multipart/form-data"}
         
        });
         setFormData(initialState);
      }
     catch(err) {
      console.log("Frontend error:", err.response?.data || err.message);
    
      }
    
      };
  return (
    <div className="mt-26"><BusinessIdeaForm formData={formData} handleChange={handleChange} category1={category1} handleSubmit={handleSubmit} /></div>
  )
}

export default Mentor_businessIdea