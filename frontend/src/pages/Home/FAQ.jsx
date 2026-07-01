import { useState,useEffect } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import gsap from "gsap"
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

const faqs = [
  {
    question: "What is SkillHub?",
    answer:
      "SkillHub is a platform that helps learners discover skills, follow personalized roadmaps, connect with mentors, and access learning resources.",
  },
  {
    question: "How do I find the right learning roadmap?",
    answer:
      "Based on your interests and goals, SkillHub recommends roadmaps that guide you step-by-step toward your desired career or business path.",
  },
  {
    question: "Can I connect with mentors?",
    answer:
      "Yes. You can browse mentors, send mentorship requests, and receive guidance from experienced professionals.",
  },
  {
    question: "Are the learning resources free?",
    answer:
      "Many resources are free, while some premium resources may require enrollment depending on the mentor or course provider.",
  },
  {
    question: "How can I track my progress?",
    answer:
      "Your dashboard includes roadmap tracking, completed resources, mentorship activities, and learning milestones.",
  },
  {
    question: "Can mentors upload their own content?",
    answer:
      "Yes. Mentors can upload videos, articles, checklists, assignments, and other learning materials for learners.",
  },
];

export default function FAQSection() {
  const [active, setActive] = useState(null);
  useEffect(()=>{
    gsap.fromTo('.swaggerbox',{
        x:100,
        opacity:0,
         
    },{
        x:0,
        opacity:1,
        duration:0.5,
         stagger:0.5,
         scrollTrigger:{
            trigger:".swagger-container",
            start:"top 80%",
            toggleActions: "play none none none",
            once:true
         }

       

    })
  },[])

  const toggleFAQ = (index) => {
    setActive(active === index ? null : index);
  };

  return (
    <section className="py-10 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-8">
          {/* <span className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
            Frequently Asked Questions
          </span> */}

          <h2 className="text-4xl md:text-5xl font-bold mt-6 bg-gradient-to-r from-blue-900 to-cyan-400 bg-clip-text text-transparent">
            Got Questions?
          </h2>

          <p className="text-slate-600 mt-4 text-lg">
            Find answers to the most common questions about SkillHub.
          </p>
        </div>

        {/* FAQ List */}
        <div className="space-y-5 swagger-container">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="swaggerbox bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between p-6 text-left"
              >
                <span className="font-semibold text-lg text-slate-800">
                  {faq.question}
                </span>

                {active === index ? (
                  <ChevronUp className="text-blue-600" size={22} />
                ) : (
                  <ChevronDown className="text-blue-600" size={22} />
                )}
              </button>

              <div
                className={`transition-all duration-300 overflow-hidden ${
                  active === index
                    ? "max-h-40 opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                <div className="px-6 pb-6 text-slate-600 leading-relaxed">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center bg-gradient-to-r from-blue-900 via-blue-700 to-cyan-500 rounded-3xl p-10">
          <h3 className="text-3xl font-bold text-white">
            Still Have Questions?
          </h3>

          <p className="text-blue-100 mt-3">
            Our team is ready to help you start your learning journey.
          </p>

          <button className="mt-6 bg-white text-blue-700 px-8 py-3 rounded-xl font-semibold hover:scale-105 transition">
            Contact Support
          </button>
        </div>

      </div>
    </section>
  );
}