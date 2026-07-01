import React from 'react'
import { useForm } from 'react-hook-form';

function StepFive({nextStep,prevStep,formdata,setFormdata}) {
   const {register,handleSubmit,formState:{errors}}=useForm({defaultValues:{
          title:formdata.steps[3].title,
        description:formdata.steps[3].description,
        checklist:formdata.steps[3].checklist,
        resources:formdata.steps[3].resources,
        mentortips:formdata.steps[3].mentortips,
    }});
    const onSubmit=(data)=>{
        
        const updateSteps=[...formdata.steps];
        updateSteps[3]={...updateSteps[3],...data};
        setFormdata({...formdata,steps:updateSteps});
      
        nextStep();
      }
  return (
    <div><form 
  onSubmit={handleSubmit(onSubmit)} 
  className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg space-y-4"
>
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">step title</label>
    <input 
      type="text" 
      placeholder="Enter your phone number" 
      {...register("title",{required:"Phone number is required"})} 
      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    <p className="text-red-500 text-sm mt-1">{errors.phno?.message}</p>
  </div>

  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">description</label>
    <input 
      type="text" 
      placeholder="Enter your address" 
      {...register("description",{required:"Address is required"})} 
      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    <p className="text-red-500 text-sm mt-1">{errors.address?.message}</p>
  </div>
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">checklist</label>
    <input 
      type="text" 
      placeholder="Enter your address" 
      {...register("checklist",{required:"Address is required"})} 
      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    <p className="text-red-500 text-sm mt-1">{errors.address?.message}</p>
  </div>
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">resource</label>
    <input 
      type="text" 
      placeholder="Enter your address" 
      {...register("resources",{required:"Address is required"})} 
      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    <p className="text-red-500 text-sm mt-1">{errors.address?.message}</p>
  </div>
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">mentor tips</label>
    <input 
      type="text" 
      placeholder="Enter your address" 
      {...register("mentortips",{required:"Address is required"})} 
      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    <p className="text-red-500 text-sm mt-1">{errors.address?.message}</p>
  </div>

  <div className="flex justify-between">
    <button 
      type="button" 
      onClick={prevStep} 
      className="bg-gray-300 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-400 transition duration-200"
    >
      Previous
    </button>
    <button 
      type="submit" 
      className="bg-denimblue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200"
    >
      Next
    </button>
  </div>
</form>
</div>
  )
}

export default StepFive