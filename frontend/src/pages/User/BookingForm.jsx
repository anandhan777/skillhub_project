import React from "react";
import { useForm} from "react-hook-form";
import {useParams} from "react-router-dom"
import {useState} from "react"
import axios from "axios"
import MentorStarRating from "./Mentor_star_rating";
import {motion} from "framer-motion";

const BookingForm = ({  }) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const {id}=useParams();
  const user=JSON.parse(localStorage.getItem("user"));
  const [showFeedback,setShowFeedback]=useState(false);

    const onSubmit=async(data, e)=>{
        e.preventDefault();
        try{
            const formdata={...data,mentorId:id,userId:user.id};
            console.log(formdata);
        const res=await axios.post(`${import.meta.env.VITE_API_URL}/api/users/sessionbooking`,formdata);

        setShowFeedback(true);
        }catch(error){
            console.log(error);

        }
    }
  return (
    <div>
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white shadow-lg rounded-lg p-8 space-y-6 max-w-lg mx-auto mt-30 "
    >
      <h2 className="text-2xl font-bold text-gray-800">Book a Mentor Session</h2>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">
          Date
        </label>
        <input
          type="date"
          {...register("date", { required: "Date is required" })}
          className="w-full border rounded px-3 py-2 focus:ring focus:ring-blue-300"
        />
        {errors.date && (
          <p className="text-red-500 text-sm mt-1">{errors.date.message}</p>
        )}
      </div>
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">
          Time
        </label>
        <input
          type="time"
          {...register("time", { required: "Time is required" })}
          className="w-full border rounded px-3 py-2 focus:ring focus:ring-blue-300"
        />
        {errors.time && (
          <p className="text-red-500 text-sm mt-1">{errors.time.message}</p>
        )}
      </div>
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">
          Topic
        </label>
        <input
          type="text"
          placeholder="e.g. React Basics"
          {...register("topic", { required: "Topic is required" })}
          className="w-full border rounded px-3 py-2 focus:ring focus:ring-blue-300"
        />
        {errors.topic && (
          <p className="text-red-500 text-sm mt-1">{errors.topic.message}</p>
        )}
      </div>
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">
          Notes
        </label>
        <textarea
          placeholder="Add any details for the mentor..."
          {...register("notes")}
          className="w-full border rounded px-3 py-2 focus:ring focus:ring-blue-300"
        />
      </div>
      <div className="flex justify-between">
       
          <button
            type="button"
           
            className="bg-white px-4 py-2 rounded-full border-2 border-blue-500 "
          >
            Back
          </button>
        
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Submit Booking
        </button>
      </div>
    </form>
    {showFeedback && ( <motion.div initial={{opacity:0,scale:0.5}} 
    animate={{opacity:1,scale:1}} exit={{opacity:0}} transition={{duration:0.3}} 
    className="relative -mt-[540px]"><MentorStarRating userId={user.id} mentorId={id}/></motion.div>

    )}
    </div>
    
  );
};

export default BookingForm;
