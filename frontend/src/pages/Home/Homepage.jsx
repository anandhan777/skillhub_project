//homepage
import React from 'react'
import Header from "./Header"
import About from "./About"
import Category from "./Category"
import CTASection from './CallToAction'
import FAQ from './FAQ'
import Mentor from "./Mentor"
import Testimonial from "./Testimonial"
import Footer from "./Footer"
import Features from './Features'
import FAQSection from './FAQ'


const Homepage = () => {
  console.log(import.meta.env.VITE_API_URL);
  return (
  
    <div><Header/>
    <About/>
    <Category/>
   
    <Features/>
    <FAQSection/>
    <Mentor />
    <Testimonial/>
    <CTASection/>
    <Footer/>
    </div>
  )
}

export default Homepage