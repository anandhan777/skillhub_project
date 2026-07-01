import React from 'react'
import "./Testimonial.css"

function Testimonial() {
  const testimonials = [
  {
    id: 1,
    name: "Jane Smith",
    role: "UI/UX Designer",
    avatar: "https://randomuser.me/api/portraits/men/10.jpg",
    feedback: "This platform helped me connect with amazing mentors and boosted my career growth.",
    rating: 5,
  },
  {
    id: 2,
    name: "Michael Johnson",
    role: "Full‑Stack Developer",
    avatar: "https://randomuser.me/api/portraits/women/9.jpg",
    feedback: "The resources here are practical and easy to follow. My coding skills improved drastically.",
    rating: 4,
  },
  {
    id: 3,
    name: "Sophia Lee",
    role: "Fashion Designer",
    avatar: "https://randomuser.me/api/portraits/men/8.jpg",
    feedback: "I loved the creative community. Sharing ideas and getting feedback was invaluable.",
    rating: 5,
  },
  {
    id: 4,
    name: "David Kim",
    role: "Data Analyst",
    avatar: "https://randomuser.me/api/portraits/women/7.jpg",
    feedback: "The mentorship sessions gave me clarity on my career path. Highly recommend!",
    rating: 5,
  },
  {
    id: 5,
    name: "Emily Davis",
    role: "Product Manager",
    avatar: "https://randomuser.me/api/portraits/men/6.jpg",
    feedback: "Great platform for networking and learning. The mentors are very supportive.",
    rating: 4,
  },
  {
    id: 6,
    name: "Chris Brown",
    role: "Backend Engineer",
    avatar: "https://randomuser.me/api/portraits/women/5.jpg",
    feedback: "I found amazing collaborators for my projects. The community is fantastic.",
    rating: 5,
  },
  {
    id: 7,
    name: "Olivia Martinez",
    role: "Digital Marketer",
    avatar: "https://randomuser.me/api/portraits/men/4.jpg",
    feedback: "The workshops and resources helped me upskill quickly. Very user‑friendly platform.",
    rating: 4,
  },
  {
    id: 8,
    name: "Daniel Wilson",
    role: "AI Researcher",
    avatar: "https://randomuser.me/api/portraits/women/3.jpg",
    feedback: "I enjoyed the structured learning paths. They kept me motivated and consistent.",
    rating: 5,
  },{
    id: 9,
    name: "Olivia Martinez",
    role: "Digital Marketer",
    avatar: "https://randomuser.me/api/portraits/men/2.jpg",
    feedback: "The workshops and resources helped me upskill quickly. Very user‑friendly platform.",
    rating: 4,
  },
  {
    id: 10,
    name: "Daniel Wilson",
    role: "AI Researcher",
    avatar: "https://randomuser.me/api/portraits/women/1.jpg",
    feedback: "I enjoyed the structured learning paths. They kept me motivated and consistent.",
    rating: 5,
  },
];

  return (
    <div className='py-10 pb-20'><h1 className="text-3xl font-bold text-center mb-10">Success Stories</h1>
    
    <div className=" bg-gray-200 py-10">
      <div className="container grid grid-cols-10 gap-10 mt-10 w-full">
        {testimonials.map((t) => (
          <div className="border-2 border-blue-700 h-[300px] w-[250px] rounded-2xl p-4 flex flex-col items-center shadow-md bg-white">
  {/* Avatar */}
  <img
    src={t.avatar}
    alt="User Avatar"
    className="rounded-full border h-24 w-24 border-bluw-500 mb-3"
  />

  {/* Name */}
  <h3 className="text-base font-semibold text-blue-700">{t.name}</h3>
  <p className="text-xs text-gray-900">{t.role}</p>

  {/* Testimonial Text */}
  <p className="text-sm text-gray-900 text-center mt-3">
   {t.feedback}
  </p>

  {/* Rating */}
  <div className="flex mt-3 text-yellow-500">
    {('⭐'.repeat(t.rating))}
  </div>
</div>))}
       </div>
    </div>
    </div>
  )
}

export default Testimonial