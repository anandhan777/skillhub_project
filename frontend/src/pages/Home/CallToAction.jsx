import {useEffect,useRef} from "react"
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import ctaimage from "../../assets/Home_images/cta.png"
gsap.registerPlugin(ScrollTrigger);


const CTASection = () => {
    useEffect(()=>{
        gsap.fromTo('.head',{
            x:50,
            opacity:0,
        },{
            x:0,
            opacity:1,
            duration:0.6,
        
            scrollTrigger:{
                trigger:".scroll-container",
                start:"top 80%",
           
            }
        }),
        gsap.fromTo('.para',{
            y:20,
            opacity:0,
        },{
            y:0,
            opacity:1,
            duration:0.7,
           
             scrollTrigger:{
                trigger:".scroll-container",
                start:"top 80%",
           
            }
        }),
        gsap.fromTo('.button',{
            scale:0,
            opacity:0,
        },{
            scale:1,
            opacity:1,
            duration:1,
          
             scrollTrigger:{
                trigger:".scroll-container",
                start:"top 80%",
             
            }
        }),
  
        gsap.fromTo('.immg',{
            x:-80,
            opacity:0,
        },{
            x:0,
            opacity:1,
            duration:1,
           
             scrollTrigger:{
                trigger:".scroll-container",
                start:"top 80%",
             
            }
        })
    },[])
  return (
    <section className="scroll-container py-24 px-6 bg-slate-50">
      <div className="max-w-7xl mx-auto ">

        <div className="
          bg-gradient-to-r
          from-blue-900
          via-blue-700
          to-cyan-500
          rounded-[40px]
          overflow-hidden
          shadow-2xl
        ">

          <div className="grid lg:grid-cols-2 items-center">

            {/* IMAGE SIDE */}
            <div className="h-full flex justify-center">

              <img
                src={ctaimage}
                alt="SkillHub Learning"
                className="immg object-cover drop-shadow-2xl rounded-y-[40px] "
              />

            </div>

            {/* CONTENT SIDE */}
            <div className="p-10 lg:p-16 text-white">

              <span className="head
                bg-white/15
                px-4
                py-2
                rounded-full
                text-sm
              ">
                Start Your Journey
              </span>

              <h2 className="head text-5xl font-bold mt-6 leading-tight">
                Turn Your Skills Into
                <span className="head block text-cyan-200">
                  Real Opportunities
                </span>
              </h2>

              <p className="para mt-6 text-blue-100 text-lg leading-relaxed">
                Learn from curated resources, connect with expert
                mentors, discover business opportunities and
                follow a roadmap designed specifically for you.
              </p>

              <div className="button flex gap-4 mt-10 flex-wrap">

                <button className="
                  bg-white
                  text-blue-700
                  px-8
                  py-4
                  rounded-2xl
                  font-semibold
                  hover:scale-105 transition-transform
                ">
                  Get Started
                </button>

                <button className="
                  border-2
                  border-white
                  px-8
                  py-4
                  rounded-2xl
                  font-semibold
                   hover:scale-105 transition-transform
                ">
                  Learn More
                </button>

              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default CTASection;