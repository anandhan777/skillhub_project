import React from "react";
import { NavLink } from "react-router-dom";
const LearningResources = () => {
  const resources = [
    {
      type: "Video",
      title: "Intro to Digital Design",
      uploadedBy: "Mentor John",
      link: "/user/learning/video"
    },
    {
      type: "Article",
      title: "Top 10 UI/UX Principles",
      uploadedBy: "Admin",
      link: "/user/learning/article"
    },
    {
      type: "Checklist",
      title: "Startup Roadmap Checklist",
      uploadedBy: "Mentor Emily",
      link: "#"
    }
  ];

  return (
    <div className="p-26">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Learning Resources</h1>
        <p className="text-gray-600">
          Strengthen your skills with curated videos, articles, and checklists.
        </p>
      </div>
      <div>
        <nav>
          <NavLink to="/user/learning/video">video</NavLink>
          <NavLink to="/user/learning/article">Article</NavLink>
          <NavLink to="/user/checklist">checklist</NavLink>
        </nav>
      </div>
      {/* Resource Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {resources.map((res, idx) => (
          <div
            key={idx}
            className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            {/* Resource Type Banner */}
            <div className="bg-blue-500 text-white px-4 py-2 font-semibold">
              {res.type}
            </div>

            {/* Resource Content */}
            <div className="p-4 h-[300px]">
              <h2 className="text-lg font-bold mb-2">{res.title}</h2>
              <p className="text-sm text-gray-500 mb-4">
                Uploaded by: {res.uploadedBy}
              </p>
              <a
                href={res.link}
                className="inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-200"
              >
                View Resource
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LearningResources;
