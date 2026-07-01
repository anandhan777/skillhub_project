import React from 'react'
import bg_img from "../../assets/Home_images/Header.jpeg";
import "./Header.css"
import gsap from "gsap"
import {useEffect,useRef} from "react"
import {useNavigate} from 'react-router-dom';

function Header() {

   const h1Ref = useRef();
  const h2Ref = useRef();
  const navigate=useNavigate();

  useEffect(() => {
    const tween1=gsap.from(h1Ref.current, { x: 50, opacity: 0,duration: 1.5,durat:1, ease: "power2.out" });
    const tween2=gsap.from(h2Ref.current, { y: 50, opacity: 0, duration: 1.5, ease: "power2.out" });
    return()=>{
      tween1.revert();
      tween2.revert();

    }
  }, []);
  return (
    <div style={{backgroundImage:`url(${bg_img})`,backgroundPosition:"center",backgroundSize:"cover",height:"655px"}}>
        <div className="overlay"><div className="ml-30 pt-40"><h1 ref={h1Ref} className=' text-7xl text-white font-extrabold w-[750px]'>Transform Your Skills Into Business Ideas</h1>
        <h2 ref={h2Ref} className=' h2 text-4xl text-white font-light w-[750px] pt-4'>SkillHub helps you discover the right business idea that matches your skills.</h2>
        <div className="flex mt-6 gap-5"><button  onClick={()=>navigate("/login")} className='btn1 px- bg-blue-500 rounded-full hover:bg-blue-700 text-2xl p-2 text-white font-bold py-2 px-6 rounded'>Find my idea</button>
   <button onClick={()=>navigate("/login")} className='btn2 text-2xl p-2  font-bold py-2 px-6 rounded-full text-white  hover:text-blue-900'>get started</button></div></div>
        </div>
    </div>
  )
}

export default Header