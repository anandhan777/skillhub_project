import React from "react";

const RoadmapPreview = ({ formdata, prevStep, handleSubmit }) => {
  console.log(formdata);
  return (
    <div className="bg-white shadow rounded p-6">
      <h2 className="text-2xl font-bold mb-6">Preview Roadmap</h2>

      {/* Roadmap Info */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold">Roadmap Info</h3>
        <p><strong>Title:</strong> {formdata.name}</p>
        <p><strong>Category:</strong> {formdata.category}</p>
      </div>

      {/* Steps */}
      {formdata.steps.map((step, index) => (
        <div key={index} className="mb-6 border-t pt-4">
          <h3 className="text-lg font-bold">Step {index + 1}: {step.title}</h3>
          <p><strong>Description:</strong> {step.description}</p>
          <p><strong>Checklist:</strong> {step.checklist}</p>
          <p><strong>Resources:</strong> {step.resources}</p>
          <p><strong>Mentor Tips:</strong> {step.mentortips}</p>
        </div>
      ))}

      {/* Navigation */}
      <div className="flex justify-between mt-6">
        <button
          onClick={prevStep}
          className="bg-gray-300 px-4 py-2 rounded"
        >
          Previous
        </button>
        <button
          onClick={handleSubmit}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Submit Roadmap
        </button>
      </div>
    </div>
  );
};

export default RoadmapPreview;
