import React from 'react'
import { useState } from 'react'
import Stepper from "../../components/PageComponents/Stepper"
import StepOne from '../../components/PageComponents/StepOne'
import StepTwo from '../../components/PageComponents/StepTwo'
import StepThree from '../../components/PageComponents/StepThree'
import StepFour from '../../components/PageComponents/StepFour'
import StepFive from '../../components/PageComponents/StepFive'
import StepSix from '../../components/PageComponents/StepSix'
import RoadmapPreview from '../../components/PageComponents/Preview'
import axios from 'axios'
import Alert from '../../components/Common/Alert'
import { useNavigate } from 'react-router-dom'
const RoadmapForm = () => {
    const[alert,setAlert]=useState(false);
    const naviagte=useNavigate();
    

    const[step,setStep]=useState(1);
    const[formdata,setFormdata]=useState({
      name:"",
      category:"",
      steps:[{title:"",description:"",checklist:"",resources:"",mentortips:""},
        {title:"",description:"",checklist:"",resources:"",mentortips:""},
        {title:"",description:"",checklist:"",resources:"",mentortips:""},
        {title:"",description:"",checklist:"",resources:"",mentortips:""},
        {title:"",description:"",checklist:"",resources:"",mentortips:""},
      ]
    });

    const nextStep=()=>{
        setStep((pre)=>pre+1);
    };
    const prevStep=()=>{
        setStep((pre)=>pre-1);
    };

    const handleSubmit=async()=>{
        try{
        const payload={
            name:formdata.name,
            category:formdata.category,
            steps:formdata.steps.map((step)=>({
               title:step.title,
               description:step.description,
               checklist:step.checklist.split(",").map((item)=>item.trim()).filter(Boolean),
               resources:step.resources.split(",").map((item)=>item.trim()).filter(Boolean),
               mentortips:step.mentortips,
            }))
        }

        const res = await axios.post("http://localhost:5000/api/admin/createroadmap",payload);
        console.log(res.data);
    }catch(err){
        console.log(err.message);    
    }
    
    setAlert(true);
    alert("roadmap created successfully");
    navigate("/admin/roadmapform");

    }
  return (
    <div className="pt-20">
    <div className="flex justify-center items-center">
       
        
        <div className='w-[1000px]'>
            
            <Stepper step={step} setStep={setStep}/>

            {step===1 &&(
                <StepOne formdata={formdata} nextStep={nextStep}  setFormdata={setFormdata}/>
            )}
             {alert && (<Alert type="success" message="new roadmap has been created" onClose={()=>setAlert(false)}/>)}
            {step===2 &&(
                <StepTwo formdata={formdata} nextStep={nextStep} prevStep={prevStep} setFormdata={setFormdata}/>

            )}
            {step===3 &&(
                <StepThree formdata={formdata} nextStep={nextStep} prevStep={prevStep} setFormdata={setFormdata}/>
            )}
            {step===4 &&(
                <StepFour formdata={formdata} nextStep={nextStep} prevStep={prevStep} setFormdata={setFormdata}/>
            )}
            {step===5 &&(
                <StepFive formdata={formdata} nextStep={nextStep} prevStep={prevStep} setFormdata={setFormdata}/>
            )}
            {step===6 &&(
                <StepSix formdata={formdata} nextStep={nextStep} prevStep={prevStep} setFormdata={setFormdata}/>
            )}
            {step===7 &&(
                <RoadmapPreview formdata={formdata} handleSubmit={handleSubmit} prevStep={prevStep}/>
            )}

        </div>
         
    </div>
   
    </div>
  )
}

export default RoadmapForm