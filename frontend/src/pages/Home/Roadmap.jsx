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
    const [roadmap,setRoadmap]=useState([]);
    const [progress,setProgress]=useState(0);
    useEffect(()=>{
        const interval=setInterval(()=>{
           setProgress((prev)=>(prev<100? prev+1 :100));
           

        },100);
        return ()=>clearInterval(interval);
    },[]);

    useEffect(()=>{
        const fetchroadmap=async()=>{
            try{
            const res=await axios.get(`${import.meta.env.VITE_API_URL}/api/user/getroadmap`);
            setRoadmap(res.data);
            }catch(err){
                console.log(err.message);
            }
        }
        fetchroadmap();
    },[]);

  return (
    <div >
        <div className="mt-20 flex justify-center"><h1 className="text-blue-500 text-4xl font-bold ">your journey simplified</h1>
        </div>
         <p className="text-gray-700 pb-8 text-center">Follow a clear roadmap to turn your idea into reality.</p>
        <div className="flex gap-55 ml-[120px]  mb-8 ">
                <div  className='w-[300px] h-[200px] shadow-2xl rounded-2xl  text-xl text-center border-3 border-blue-400
                 translate-transform duration-300 hover:scale-105 '><div className="flex justify-center m-0 "><img src={idea} alt="Idea" className="w-26 h-26 "/></div>
                 <span className="pb-4 font-semibold">idea validation</span>
                 <div className="py-1 px-3 ml-17 text-white bg-gradient-to-r from-indigo-600 w-40 to-indigo-700 rounded-2xl font-light text-xl mt-3"><button onClick={() => navigate('/user/stepdetails')}>explore</button></div></div>
                <div  className='w-[300px] h-[200px] shadow-2xl rounded-2xl  text-xl text-center border-3 border-blue-400
                 translate-transform duration-300 hover:scale-105 '><div className="flex justify-center m-0 "><img src={costestimate} alt="Idea" className="w-26 h-26 "/></div>
                 <span className="pb-4 font-semibold">cost estimation</span>
                 <div className="py-1 px-3 ml-17 text-white bg-gradient-to-r from-indigo-600 w-40 to-indigo-700 rounded-2xl font-light text-xl mt-3"><button>explore</button></div></div>
                <div  className='w-[300px] h-[200px] shadow-2xl rounded-2xl  text-xl text-center border-3 border-blue-400
                 translate-transform duration-300 hover:scale-105 '><div className="flex justify-center m-0 "><img src={marketing} alt="Idea" className="w-26 h-26 "/></div>
                 <span className="pb-4 font-semibold">marketing scheme</span>
                 <div className="py-1 px-3 ml-17 text-white bg-gradient-to-r from-indigo-600 w-40 to-indigo-700 rounded-2xl font-light text-xl mt-3"><button>explore</button></div></div>
                
            </div>
            
        <div className="w-[1100px] h-[20px] bg-blue-200 rounded-full ml-60 ">
        
            <div className="flex gap-38 bg-gradient-to-r from-[#1e97f3] to-[#044c8f]  h-[20px] rounded-full duration-500" style={{width:`${progress}%`}}>
            </div>
            <div className="flex relative justify-between -mt-11">
                    <div className="bg-green-300 w-[60px] h-[60px] rounded-full border-5 border-blue-700 flex text-white font-bold text-2xl justify-center items-center relative">1</div>
                <div className="bg-green-300 w-[60px] h-[60px] rounded-full border-5 border-blue-700 flex text-white font-bold text-2xl justify-center items-center">2</div>
                <div className="bg-green-300 w-[60px] h-[60px] rounded-full border-5 border-blue-600 flex text-white font-bold text-2xl justify-center items-center">3</div>
                <div className="bg-green-300 w-[60px] h-[60px] rounded-full border-5 border-blue-500 flex text-white font-bold text-2xl justify-center items-center">4</div>
                <div className="bg-green-300 w-[60px] h-[60px] rounded-full border-5 border-blue-500 flex text-white font-bold text-2xl justify-center items-center">5</div>
              
            </div>
            
        </div>
        <div className="flex gap-55 ml-[380px] mt-6">
               <div  className='w-[300px] h-[200px] shadow-2xl rounded-2xl  text-xl text-center border-3 border-blue-400
                 translate-transform duration-300 hover:scale-105 '><div className="flex justify-center m-0 "><img src={requirement} alt="Idea" className="w-26 h-26 "/></div>
                 <span className="pb-4 font-semibold">requirements gathering</span>
                 <div className="py-1 px-3 ml-17 text-white bg-gradient-to-r from-indigo-600 w-40 to-indigo-700 rounded-2xl font-light text-xl mt-3"><button>explore</button></div></div>
                <div  className='w-[300px] h-[200px] shadow-2xl rounded-2xl  text-xl text-center border-3 border-blue-400
                 translate-transform duration-300 hover:scale-105 '><div className="flex justify-center m-0 "><img src={legal} alt="Idea" className="w-26 h-26 "/></div>
                 <span className="pb-4 font-semibold">legal registration</span>
                 <div className="py-1 px-3 ml-17 text-white bg-gradient-to-r from-indigo-600 w-40 to-indigo-700 rounded-2xl font-light text-xl mt-3"><button>explore</button></div></div>
        </div>
    </div>
    
  )
}

export default Roadmap