import {
  Users,
  BookOpen,
  Star,
  TrendingUp,
  MessageSquare,
  Calendar,
  Plus,
} from "lucide-react";
import {useEffect} from "react"
import { useNavigate } from "react-router-dom";
import mentorhome1 from "../../assets/Mentor_images/mentorhomepage1.png";

export default function Mentorpage() {
  const navigate=useNavigate();
    useEffect(()=>{
       const user=JSON.parse(localStorage.getItem("user"));
       const token=localStorage.getItem("token");
        if(user.isProfile){
        navigate(`/mentor`);
       }
       else{
        navigate("/mentor/profilecreate");
       }
      },[]);
  const stats = [
    {
      title: "Students",
      value: "1,240",
      icon: <Users size={28} />,
    },
    {
      title: "Courses",
      value: "12",
      icon: <BookOpen size={28} />,
    },
    {
      title: "Reviews",
      value: "4.9",
      icon: <Star size={28} />,
    },
    {
      title: "Completion Rate",
      value: "87%",
      icon: <TrendingUp size={28} />,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 pt-15 ">
      {/* Hero Section */}

      <section className=" overflow-hidden">
        {/* <div className="bg-gradient-to-r from-blue-900 via-blue-700 to-cyan-500 "> */}
        <div className="" style={{backgroundImage:`url(${mentorhome1})`,backgroundPosition:"center",}}>
          <div className="max-w-7xl mx-auto px-6 py-16">
            <div className="grid md:grid-cols-2 items-center gap-10">
              <div className="text-white">
                <span className="px-4 py-2 rounded-full bg-white/10 border border-white/20">
                  Mentor Dashboard
                </span>

                <h1 className="text-5xl font-bold mt-6">
                  Welcome Back,
                  <br />
                  Mentor
                </h1>

                <p className="mt-4 text-blue-100 text-lg">
                  Track student progress, manage courses and help learners
                  achieve their goals.
                </p>

                <div className="flex gap-4 mt-8">
                  <button className="bg-white text-blue-700 px-6 py-3 rounded-xl font-semibold">
                    Create Course
                  </button>

                  <button className="border border-white px-6 py-3 rounded-xl">
                    Schedule Session
                  </button>
                </div>
              </div>

              {/* <div>
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a"
                  alt="mentor"
                  className="rounded-3xl shadow-2xl h-[350px] w-full object-cover"
                />
              </div> */}
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}

      <section className="max-w-7xl mx-auto px-6 mt-10">
        <div className="grid md:grid-cols-4 gap-6">
          {stats.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 shadow-md"
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-gray-500">{item.title}</p>
                  <h2 className="text-3xl font-bold mt-2">
                    {item.value}
                  </h2>
                </div>

                <div className="bg-blue-100 p-3 rounded-xl text-blue-600">
                  {item.icon}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Main Grid */}

      <section className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Recent Questions */}

          <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm p-6">
            <div className="flex justify-between mb-6">
              <h2 className="font-bold text-xl">
                Recent Student Questions
              </h2>

              <MessageSquare className="text-blue-600" />
            </div>

            <div className="space-y-4">
              {[
                "How does React useState work?",
                "Can you explain JWT authentication?",
                "How to deploy MERN applications?",
              ].map((q, i) => (
                <div
                  key={i}
                  className="border rounded-xl p-4 hover:bg-slate-50"
                >
                  {q}
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Sessions */}

          <div className="bg-white rounded-2xl shadow-sm p-6">
            <div className="flex justify-between mb-6">
              <h2 className="font-bold text-xl">
                Upcoming Sessions
              </h2>

              <Calendar className="text-blue-600" />
            </div>

            <div className="space-y-4">
              <div className="bg-blue-50 p-4 rounded-xl">
                <h3 className="font-semibold">
                  React Masterclass
                </h3>
                <p className="text-gray-500 text-sm">
                  Tomorrow • 7 PM
                </p>
              </div>

              <div className="bg-blue-50 p-4 rounded-xl">
                <h3 className="font-semibold">
                  MongoDB Workshop
                </h3>
                <p className="text-gray-500 text-sm">
                  Friday • 6 PM
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Analytics */}

      <section className="max-w-7xl mx-auto px-6 pb-10">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h2 className="font-bold text-xl mb-6">
              Course Performance
            </h2>

            <div className="h-64 flex items-center justify-center text-gray-400">
              Chart Area
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h2 className="font-bold text-xl mb-6">
              Recent Reviews
            </h2>

            <div className="space-y-4">
              <div className="border-b pb-3">
                ⭐⭐⭐⭐⭐ Great course and easy to follow.
              </div>

              <div className="border-b pb-3">
                ⭐⭐⭐⭐⭐ Best mentor on SkillHub.
              </div>

              <div>
                ⭐⭐⭐⭐ Very informative sessions.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Actions */}

      <section className="max-w-7xl mx-auto px-6 pb-16">
        <div className="bg-gradient-to-r from-blue-600 to-cyan-500 rounded-3xl p-8 text-white">
          <h2 className="text-3xl font-bold">
            Ready to create something new?
          </h2>

          <p className="mt-2 text-blue-100">
            Share your knowledge and help more learners.
          </p>

          <button className="mt-6 bg-white text-blue-700 px-6 py-3 rounded-xl font-semibold flex items-center gap-2">
            <Plus size={18} />
            Create New Course
          </button>
        </div>
      </section>
    </div>
  );
}