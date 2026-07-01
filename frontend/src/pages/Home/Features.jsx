import React from 'react'
import idea from "../../assets/Home_images/idea.png"
import roadmap from "../../assets/Home_images/roadmap.png"
import learning from "../../assets/Home_images/learning.png"
import gsap from "gsap";
import {ScrollTrigger} from 'gsap/all';
import {useEffect} from "react"
import { backInOut } from 'framer-motion';

function Features() {
    useEffect(()=>{
        gsap.fromTo('.head',{
            x:-90,
            opacity:0
        },{
            x:0,opacity:1,
            duration:0.6,
            
            scrollTrigger:".scroll-container" 
    }),
        gsap.fromTo('.para',{
            x:90,
            opacity:0
        },{
            x:0,opacity:1,
            duration:0.6,  
            scrollTrigger:".scroll-container"  
    }),
        gsap.fromTo('.stagger-container',{
            y:50,
            opacity:0
        },{
            y:0,opacity:1,
            duration:0.6, 
            stagger:0.3 ,
            ease:"backInOut" ,
            scrollTrigger:".scroll-container" 
    })
})
  return (
    <div>
        <section className="scroll-container py-20 bg-slate-50">
  <div className="max-w-7xl mx-auto px-6">

    <div className="text-center mb-16">
      <h2 className=" head text-5xl font-bold text-slate-900">
        Everything You Need To Build Your Startup
      </h2>

      <p className="para mt-4 text-gray-600 text-lg max-w-3xl mx-auto">
        From discovering innovative business ideas to connecting with expert
        mentors, our platform provides all the tools needed to turn your vision
        into a successful business.
      </p>
    </div>

    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

      {/* Feature 1 */}
      <div className="stagger-container bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl hover:-translate-y-2 duration-300 border">
        <div className="w-20 h-20 rounded-2xl bg-cyan-200 flex items-center justify-center text-3xl">
          
        </div>

        <h3 className="text-2xl font-bold mt-6">
          AI-Powered Business Ideas
        </h3>

        <p className="mt-3 text-gray-600">
          Discover innovative startup ideas tailored to modern market trends
          and emerging opportunities.
        </p>
      </div>

      {/* Feature 2 */}
      <div className="stagger-container bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl hover:-translate-y-2 duration-300 border">
        <div className="w-20 h-20 rounded-2xl bg-cyan-200 flex items-center justify-center text-3xl">
         <img src={idea} />
        </div>

        <h3 className="text-2xl font-bold mt-6">
          Step-by-Step Roadmaps
        </h3>

        <p className="mt-3 text-gray-600">
          Get detailed startup roadmaps covering planning, development,
          marketing, funding, and scaling.
        </p>
      </div>

      {/* Feature 3 */}
      <div className="stagger-container bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl hover:-translate-y-2 duration-300 border">
        <div className="w-20 h-20 rounded-2xl  flex items-center justify-center text-3xl">
          <img src={learning} className=''/>
        </div>

        <h3 className="text-2xl font-bold mt-6">
          Learning Resources
        </h3>

        <p className="mt-3 text-gray-600">
          Access curated courses, guides, tutorials, and industry insights to
          sharpen your entrepreneurial skills.
        </p>
      </div>

      {/* Feature 4 */}
      <div className="stagger-container bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl hover:-translate-y-2 duration-300 border">
        <div className="w-16 h-16 rounded-2xl bg-orange-100 flex items-center justify-center text-3xl">
          🎯
        </div>

        <h3 className="text-2xl font-bold mt-6">
          Expert Mentorship
        </h3>

        <p className="mt-3 text-gray-600">
          Connect directly with experienced mentors for personalized guidance
          and business advice.
        </p>
      </div>

      {/* Feature 5 */}
      <div className="stagger-container bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl hover:-translate-y-2 duration-300 border">
        <div className="w-16 h-16 rounded-2xl bg-pink-100 flex items-center justify-center text-3xl">
          💬
        </div>

        <h3 className="text-2xl font-bold mt-6">
          Real-Time Chat
        </h3>

        <p className="mt-3 text-gray-600">
          Communicate instantly with mentors and entrepreneurs through an
          integrated messaging system.
        </p>
      </div>

      {/* Feature 6 */}
      <div className="stagger-container bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl hover:-translate-y-2 duration-300 border">
        <div className="w-16 h-16 rounded-2xl bg-cyan-100 flex items-center justify-center text-3xl">
          🚀
        </div>

        <h3 className="text-2xl font-bold mt-6">
          Startup Launch Support
        </h3>

        <p className="mt-3 text-gray-600">
          Transform ideas into reality with launch strategies, growth plans,
          and practical execution guidance.
        </p>
      </div>

    </div>
  </div>
</section>
    </div>
  )
}

export default Features