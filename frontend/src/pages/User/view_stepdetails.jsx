import React from "react";
import gsap from "gsap"
import {useEffect,useRef} from "react"
import {useGSAP} from "@gsap/react"
import { useNavigate,useLocation } from 'react-router-dom';
import axios from "axios"


const StepDetails = () => {
    const navigate=useNavigate();
    const location=useLocation();
    const steps=location.state;
    
   

    useGSAP(()=>{
        gsap.fromTo(".fade_up",
            {y:40,opacity:0},
            {
            ease:'power3.Out',
            opacity:1,
            y:0,
            duration:0.5,
        })
        gsap.fromTo(".para",{
            y:20,opacity:0},{
            ease:'power1.Out',
            opacity:1,
            y:0,
            duration:1,
           stagger:0.5,
            }
        );
     
    },[]);
    const handleClick=async()=>{
      const token=localStorage.getItem("token");
      try{
      const res=await axios.post(`${import.meta.env.VITE_API_URL}/api/users/complete-step`,{roadmapId:steps.roadmapId,stepId:steps.steps._id},{headers:{Authorization:`Bearer ${token}`}});
      console.log(res.data);
      }catch(error){
        console.log(error);
      }
       navigate("/user/roadmap");
      }
        
    

  return (
    <div>
    <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6 mb-6 mt-40">
      {/* Step Title */}
      <h2  className="fade_up text-2xl font-bold text-blue-600 mb-2">
        {steps.steps.title}
      </h2>

      {/* Step Description */}
      <p className="para text-gray-700 mb-4">{steps.steps.description}</p>

      {/* Checklist */}
      <div className="mb-4">
        <h3 className=" fade_up text-lg font-semibold text-gray-800">Checklist</h3>
        <ul className=" para list-disc list-inside text-gray-600">
          {steps.steps.checklist.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>

      {/* Resources */}
      <div className="mb-4">
        <h3  className="fade_up text-lg font-semibold text-gray-800">Resources</h3>
        <ul className="para list-disc list-inside text-blue-600">
          {steps.steps.resources?.map((res, index) => (
            <li key={index}>
              <a href={res} target="_blank" rel="noopener noreferrer">
                {res}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Mentor Tips */}
      <div className="p-2 px-4 bg-blue-100 rounded-lg">
        <h3 className=" fade_up text-lg font-semibold text-gray-800">Mentor Tips</h3>
        <p className=" para italic text-gray-600">{steps.steps.mentortips}</p>
      </div>
    </div>
    <button onClick={handleClick} className=" btn block mx-auto bg-gradient-to-r from-blue-600 to-cyan-500  text-white px-6 py-2 flex ml-[908px] rounded-lg hover:bg-gradient-to-l transition duration-300">complete and continue</button>  
    </div>
  );
};

export default StepDetails;