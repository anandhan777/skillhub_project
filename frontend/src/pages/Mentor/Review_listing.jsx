import React  from 'react'
import axios from "axios"
import {useState,useEffect} from "react"

function Review_listing() {
    const[reviews,setReviews]=useState([]);
    const[calculate,setCalculate]=useState({
      totalrating:0,
      totalreviews:0,
      average:0
    });
    const user=JSON.parse(localStorage.getItem("user"));
useEffect(()=>{
    const fetchReviews=async()=>{
        try{
        const [res,cal]=await Promise.all([axios.get(`http://localhost:5000/api/mentor/listmentorreviews/${user.id}`),
          axios.get(`http://localhost:5000/api/mentor/calculaterating/${user.id}`)
        ]);
        setReviews(res.data);
        setCalculate(cal.data);
        console.log(cal.data.rating);
        }catch(error){
            console.log(error);
        }
    }
    fetchReviews();
    },[])
  return (
    <div><div className="bg-gray-50 min-h-screen p-6 pt-18">
  <div className="max-w-5xl mx-auto">

    {/* Header */}
    <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
      <h1 className="text-2xl font-bold text-gray-800">
        Reviews & Ratings
      </h1>

      <div className="flex items-center gap-3 mt-3">
        <span className="text-4xl font-bold text-gray-900">
          {calculate.average}
        </span>

        <div>
          <div className="text-yellow-500 text-xl">
            ⭐⭐⭐⭐⭐
          </div>
          <p className="text-gray-500 text-sm">
            Based on {calculate.totalreviews} reviews
          </p>
        </div>
      </div>
    </div>

    {/* Reviews List */}
    <div className="space-y-4">

      {reviews.map((review) => (
        <div
          key={review._id}
          className="bg-white rounded-xl shadow-sm border p-5 hover:shadow-md transition"
        >
          <div className="flex justify-between items-start">

            <div>
              <h3 className="font-semibold text-gray-800">
                {review.userId?.name}
              </h3>

              <div className="text-yellow-500 mt-1">
                {"⭐".repeat(review?.rating)}
              </div>
            </div>

            <span className="text-sm text-gray-400">
              {new Date(review.createdAt).toLocaleDateString()}
            </span>

          </div>

          <p className="mt-4 text-gray-600 leading-relaxed">
            {review?.feedback}
          </p>
        </div>
      ))}

    </div>
  </div>
</div></div>
  )
}

export default Review_listing