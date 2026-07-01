import React from 'react'
import {useEffect,useState} from 'react'
import {BsCalculatorFill} from "react-icons/bs"
import idea from "../../assets/user_images/idea.png"
import legal from "../../assets/user_images/legal.png"
import marketing from "../../assets/user_images/marketing.png"
import requirement from "../../assets/user_images/requirement.png"
import costestimate from "../../assets/user_images/costestimate.png"
import { useNavigate } from 'react-router-dom';
import axios from "axios"
// import {GiTargetting} from "react-icons/gi";


function Roadmap() {
    const navigate=useNavigate();
    const [roadmap,setRoadmap]=useState(null);
    const [progress,setProgress]=useState(0);
    const [completedSteps,setCompletedSteps]=useState([]);
    const token=localStorage.getItem("token");

    useEffect(()=>{
        const fetchroadmap=async()=>{
            try{
            const res=await axios.get("http://localhost:5000/api/admin/getroadmaps",{
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
                const res=await axios.get(`http://localhost:5000/api/users/getprogress/${roadmap._id}`,{headers:{Authorization:`Bearer ${token}`}});
                setProgress(res.data.percentage);
                console.log(res.data.percentage);
                setCompletedSteps(res.data.completedSteps);
              
            }catch(error){
                console.log(error);
            }
        }
        fetchProgress();
    },[roadmap]);
   

    const stepStatus=(index,stepId)=>{
    if (progress!==100){
         if(completedSteps.includes(stepId)){
            return "completed"
        }else if(index===0||completedSteps.includes(roadmap?.steps[index-1]._id)){
            return "unlocked"
        }
        return "locked"
    }else{
        return progress;
    }
        
        }
       
    
  return (
    
    <div >

        <div className="mt-18 flex justify-center">
         
                {progress!==100?(<h1 className="text-blue-500 text-4xl font-bold "><span className="text-gray-700 text-4xl text-bold">Roadmap to</span> Start Your{roadmap?.name} </h1>):
                (<h1 className="text-blue-500 text-4xl font-bold "><span className="text-gray-700 text-4xl text-bold">your roadmap for</span> {roadmap?.name} completed </h1>)}
         
        </div>
         <p className="text-gray-700 pb-4 text-center">{roadmap?.description}</p>
        
        <div className="flex gap-55 ml-[120px]  mb-8">
                <div  className='w-[320px] py-5 shadow-2xl rounded-2xl  text-xl text-center border-3 border-blue-400
                 translate-transform duration-300 hover:scale-105 '><div className="flex justify-center m-0 "><img src={idea} alt="Idea" className="w-26 h-26 "/></div>
                 <span className="pb-4 font-semibold">{roadmap?.steps[0]?.title}</span>
                 <div className={`py-1 px-3 ml-20 text-white  rounded-2xl font-light text-xl mt-3 w-40 ${stepStatus(0,roadmap?.steps[0]._id)==="completed" ? `bg-green-600`:'bg-gradient-to-r from-blue-600 to-cyan-500'}`}>
                    {stepStatus(0,roadmap?.steps[0]._id)==="completed" &&(<span>step completed</span>)}
                    {stepStatus(0,roadmap?.steps[0]._id)==="unlocked" &&(<button onClick={() => navigate('/user/stepdetails',{state:{steps:roadmap?.steps[0],roadmapId:roadmap._id}})}>explore</button>)}
                   </div></div>


                     
                  <div  className='w-[320px] py-5 shadow-2xl rounded-2xl  text-xl text-center border-3 border-blue-400
                 translate-transform duration-300 hover:scale-105 '><div className="flex justify-center m-0 "><img src={legal} alt="Idea" className="w-26 h-26 "/></div>
                 <span className="pb-4 font-semibold">{roadmap?.steps[2]?.title}</span>
                 <div className={`py-1 px-3 ml-20 text-white bg-gradient-to-r w-40 rounded-2xl font-light text-xl mt-3  ${stepStatus(2, roadmap?.steps[2]?._id) === "completed" 
      ? "bg-green-600 border-green-800" 
      : stepStatus(2, roadmap?.steps[2]?._id) === "unlocked" 
        ? "bg-gradient-to-r from-blue-600 to-cyan-500" 
        : "bg-gray-400 border-gray-600"
    }`}>
                     {stepStatus(2,roadmap?.steps[2]._id)==="completed" &&(<span>step completed</span>)}
                      {stepStatus(2,roadmap?.steps[2]._id)==="unlocked" &&(<button onClick={() => navigate('/user/stepdetails',{state:{steps:roadmap?.steps[2],roadmapId:roadmap._id}})}>explore</button>)}
                      {stepStatus(2,roadmap?.steps[2]._id)==="locked" &&(<span>locked</span>)}</div></div>
                  
 
               <div  className='w-[320px] py-5 shadow-2xl rounded-2xl  text-xl text-center border-3 border-blue-400
                 translate-transform duration-300 hover:scale-105 '><div className="flex justify-center m-0 "><img src={marketing} alt="Idea" className="w-26 h-26 "/></div>
                 <span className="pb-4 font-semibold">{roadmap?.steps[4]?.title}</span>
                 <div className={`py-1 px-3 ml-20 text-white bg-gradient-to-r  w-40  rounded-2xl font-light text-xl mt-3 ${stepStatus(4, roadmap?.steps[4]?._id) === "completed" 
      ? "bg-green-600 border-green-800" 
      : stepStatus(4, roadmap?.steps[4]?._id) === "unlocked" 
        ? "bg-gradient-to-r from-blue-600 to-cyan-500" 
        : "bg-gray-400 border-gray-600"
    }`}>
                     {stepStatus(4,roadmap?.steps[4]._id)==="completed" &&(<span>step completed</span>)}
                      {stepStatus(4,roadmap?.steps[4]._id)==="unlocked" &&(<button onClick={() => navigate('/user/stepdetails',{state:{steps:roadmap?.steps[4],roadmapId:roadmap._id}})}>explore</button>)}
                      {stepStatus(4,roadmap?.steps[4]._id)==="locked" &&(<span>locked</span>)}</div></div>


               
              
            </div>
            
        <div className="w-[1100px] h-[20px] bg-blue-200 rounded-full ml-60">
        
            <div className="flex gap-38 bg-gradient-to-r from-cyan-500 to-blue-800  h-[20px] rounded-full duration-500" style={{width:`${progress}%`}}>
            </div>
            <div className="flex relative justify-between -mt-11">
                    <div className="bg-cyan-300 w-[60px] h-[60px] rounded-full border-5 border-blue-800 flex text-white font-bold text-2xl justify-center items-center relative">1</div>
                <div className="bg-cyan-300 w-[60px] h-[60px] rounded-full border-5 border-blue-800 flex text-white font-bold text-2xl justify-center items-center">2</div>
                <div className="bg-cyan-300 w-[60px] h-[60px] rounded-full border-5 border-blue-800 flex text-white font-bold text-2xl justify-center items-center">3</div>
                <div className="bg-cyan-300 w-[60px] h-[60px] rounded-full border-5 border-blue-800 flex text-white font-bold text-2xl justify-center items-center">4</div>
                <div className="bg-cyan-300 w-[60px] h-[60px] rounded-full border-5 border-blue-800 flex text-white font-bold text-2xl justify-center items-center">5</div>
              
            </div>
            
        </div>
        <div className="flex gap-55 ml-[380px] mt-6">

            <div  className='w-[320px] py-5 shadow-2xl rounded-2xl  text-xl text-center border-3 border-blue-400
                 translate-transform duration-300 hover:scale-105 '><div className="flex justify-center m-0 "><img src={costestimate} alt="Idea" className="w-26 h-26 "/></div>
                 <span className="pb-4 font-semibold">{roadmap?.steps[1]?.title}</span>
                 <div className={`py-1 px-3 ml-20 text-white  rounded-2xl font-light text-xl mt-3 w-40  ${stepStatus(1, roadmap?.steps[1]?._id) === "completed" 
      ? "bg-green-600 border-green-800" 
      : stepStatus(1, roadmap?.steps[1]?._id) === "unlocked" 
        ? "bg-gradient-to-r from-blue-600 to-cyan-500" 
        : "bg-gray-400 border-gray-600"
    }`}>
                    {stepStatus(1,roadmap?.steps[1]._id)==="completed" &&(<span>step completed</span>)}
                    {stepStatus(1,roadmap?.steps[1]._id)==="unlocked" &&(<button onClick={() => navigate('/user/stepdetails',{state:{steps:roadmap?.steps[1],roadmapId:roadmap._id}})}>explore</button>)}
                     {stepStatus(1,roadmap?.steps[1]._id)==="locked" &&(<span>locked</span>)}</div></div>
              
                     
                   <div  className='w-[320px] py-5 shadow-2xl rounded-2xl  text-xl text-center border-3 border-blue-400
                 translate-transform duration-300 hover:scale-105 '><div className="flex justify-center m-0 "><img src={requirement} alt="Idea" className="w-26 h-26 "/></div>
                 <span className="pb-4 font-semibold">{roadmap?.steps[3]?.title}</span>
                 <div className={`py-1 px-3 ml-20 text-white w-40  rounded-2xl font-light text-xl mt-3  ${stepStatus(3, roadmap?.steps[3]?._id) === "completed" 
      ? "bg-green-600 border-green-800" 
      : stepStatus(3, roadmap?.steps[3]?._id) === "unlocked" 
        ? "bg-gradient-to-r from-blue-600 to-cyan-500" 
        : "bg-gray-400 border-gray-600"
    }`}>
                     {stepStatus(3,roadmap?.steps[3]._id)==="completed" &&(<span>step completed</span>)}
                     {stepStatus(3,roadmap?.steps[3]._id)==="unlocked" &&(<button  onClick={() => navigate('/user/stepdetails',{state:{steps:roadmap?.steps[3],roadmapId:roadmap._id}})}>explore</button>)}
                     {stepStatus(3,roadmap?.steps[3]._id)==="locked" &&(<span>locked</span>)} </div></div>

                
        </div>
       
       
    </div>
    
    
  )
}

export default Roadmap


 