import React from 'react'
import { useState,useEffect } from 'react'
import {Bookmark} from "lucide-react";
import {BsBookmarkFill}from "react-icons/bs";
import {FaSearch} from "react-icons/fa";
import axios from "axios"

function Businessidea() {
    const[businessIdea,setBusinessIdea]=useState([]);
    const[search,setSearch]=useState("");
    const [progress, setProgress] = useState(0);
    const[roadmap,setRoadmap]=useState({});
     useEffect(()=>{
        const fetchroadmap=async()=>{
            try{
            const res=await axios.get(`${import.meta.env.VITE_API_URL}/api/admin/getroadmaps`,{
                headers:{Authorization: `Bearer ${token}`}
            });
           ;
            setRoadmap(res.data);
             console.log(res.data);
            }catch(err){
                console.log(err.message);   
            }
        }
        fetchroadmap();
    },[]);
     useEffect(()=>{
        const fetchProgress=async()=>{
            if (!roadmap?._id) return; 
            console.log(roadmap._id);
            try{
                const res=await axios.get(`${import.meta.env.VITE_API_URL}/api/users/getprogress/${roadmap._id}`,{headers:{Authorization:`Bearer ${token}`}});
                setProgress(res.data.percentage);
                console.log(res.data.percentage)
                setCompletedSteps(res.data.completedSteps);
              
            }catch(error){
                console.log(error);
            }
        }
        fetchProgress();
    },[roadmap])

    useEffect(()=>{
        const fetchidea=async()=>{
              try{
            
                const res=await axios.get(`${import.meta.env.VITE_API_URL}/api/users/viewbusiness`);
                console.log(res.data);
                setBusinessIdea(res.data);
               }catch(err){
                console.log(err.message);
            }
           }
            fetchidea();
        
    },[])
    const user=JSON.parse(localStorage.getItem("user"))
    const savedIdea=async(id)=>{
        await axios.post(`${import.meta.env.VITE_API_URL}/api/users/addsavedidea/${user.id}/${id}`);
        alert("business idea saved successfully");
       
    }

    const searchIdea=()=>{
       setBusinessIdea(prev=>prev.filter(m=>m.title===search));
    }

    const selectIdea=async(category)=>{
        try{
            if(progress===100){
            const res=await axios.put(`${import.meta.env.VITE_API_URL}/api/users/selectnewidea/${user.id}`,{category:category});
            alert('you really want to start a new roadmap')
            console.log(res);
            }else{
                alert("you must complete your current roadmap to go next")
            }
        }catch(error){
            console.log(error);
        }
    }

  return (
    <div className="pt-24">
        <h1 className=" text-center font-bold text-3xl bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">Discover startup ideas that align with your skills and passions </h1>
        <p className="text-center text-xl text-gray-400">turning what you know into what you grow.</p>
            <div className="flex items-center pt-5 pb-10 pl-20 justify-center ">
            <input type="text" name="business_idea" placeholder="find the right ideas to matches with your skill" value={search} onChange={(e)=>setSearch(e.target.value)}
            className="w-[900px] h-12 border-2 rounded-full pl-5 ring-2 border-gray-400 ring-transparent focus:ring-cyan-500"/>
            <button onClick={searchIdea} className="text-white bg-gradient-to-r from-blue-800 to-cyan-400 rounded-full p-4"><FaSearch/></button>
            </div>
       
        <div className="grid grid-cols-3 px-30">
        {businessIdea && businessIdea.map((idea)=>(
        <div key={idea._id} className="group ml-14 w-[340px] h-[500px] shadow-2xl border-gray-500 rounded-2xl mb-15 ">
            <div classsName="w-full h-[220px]  ">
                
               
               
            <img src={`${import.meta.env.VITE_API_URL}${idea.imageUrl}`}  className=" h-[200px] w-full rounded-t-2xl object-cover"/>
            <BsBookmarkFill onClick={()=>savedIdea(idea._id)} className='text-2xl relative ml-[300px] mt-4 opacity-0 group-hover:opacity-100 trasition-opacity duration-300'/></div>
            <div className="px-7">
            <h1 className="text-2xl bold font-semibold">{idea.title}</h1>
            <p className="text-gray-500">{idea.description}</p>
            <p className="text-gray-500">{idea.category}</p>
            <h2>{idea.requiredSkills}</h2>
            <h2>{idea.estimatedCost}</h2>
            </div>
            <div className="flex justify-center">
            <button onClick={()=>selectIdea(idea.category)} className="bg-gradient-to-r from-blue-500 to-cyan-400 h-10 rounded-full px-5 mt-5 text-white ">select Idea</button>
            </div>
        </div>
        ))}
       
                </div>
    </div>
  )
}

export default Businessidea