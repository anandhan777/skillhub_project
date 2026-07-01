import React from "react";
import about_img from "../../assets/Home_images/About.jpeg"
import "./About.css"
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useEffect } from "react";

const About = () => {
  useEffect(()=>{
    gsap.fromTo(".head1",{
      opacity:0},{opacity:1, duration:0.6,stagger:0.8,scrollTrigger:{
        trigger:".titlehead",
        start:"top 80%",
        toggleActions:"play none none reset"
      }}
    )
    gsap.fromTo(".thead",{
      opacity:0,x:-50},{opacity:1,x:0,duration:0.6}
    )

  },[])
  
  return (
    <div className="bg-gray-50 text-gray-800 ">
      {/* Hero Banner */}
     <div className="flex justify-center">
      <section className="p-10 w-[1400px]  my-10 border-2 border-gray-200 rounded-lg shadow-lg flex gap-5 ">
       
        <section className="w-[800px] ">
          <div className="scroll-trigger">
             <h1 className="bi text-4xl font-bold mb-6">About Us</h1>
        <h1 className=" bi text-[22px] ">SkillHub is more than just a platform — it’s your partner in turning passion into profit.
             Whether you’re a coder, designer, chef, or creator, SkillHub helps you transform your skills
              into sustainable business ideas.</h1>

              <div>
                <dl>
                  <dt className="bi text-xl font-bold pt-2">Discover Your Potential:</dt>
                  <dd className="bi text-xl  ">Identify the strengths you already have and see how they can be applied in the real world.</dd>
                  <dt className="bi text-xl font-bold pt-2">Tailored Business Ideas</dt>
                  <dd className="bi text-xl  ">Get personalized suggestions that align with your skillset, interests, and goals..</dd>
                  <dt className="bi text-xl font-bold pt-2">Step‑by‑Step Roadmaps</dt>
                  <dd className="bi text-xl  "> Follow clear, structured paths that guide you from idea validation to launch.</dd>
                  <dt className="bi text-xl font-bold pt-2">Mentor Support</dt>
                  <dd className="bi text-xl  ">Learn directly from experienced professionals who’ve already walked the path you’re starting.</dd>
                  <dt className="bi text-xl font-bold pt-2">Community Growth</dt>
                  <dd className="bi text-xl ">Join a network of learners, creators, and entrepreneurs who share insights and success stories.</dd>
                </dl>
              </div>
              </div>
              
              </section>
              <div className="w-[490px] h-[560px] ml-10 mb-5 rounded-2xl"><img src={about_img}  className="object-cover rounded-2xl" /></div>
      </section>
      </div>
        <section className=" titlehead bg-gradient-to-r from-blue-600 to-cyan-500 text-white py-10 text-center">
        <h1 className="text-4xl font-bold mb-4">
          <span className="head1">Empowering Skills,</span><span className="head1">Creating Businesses</span> 
        </h1>
        <p className="thead text-lg max-w-2xl mx-auto">
          SkillHub is built to help individuals transform their talents into thriving ventures.
        </p>
        
      </section>
    </div>
  );
};

export default About;
