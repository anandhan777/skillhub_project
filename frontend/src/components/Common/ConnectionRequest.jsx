import React, { useEffect, useState } from "react";
import axios from "axios";

const ConnectionRequest = () => {
  const [requests,setRequests]=useState([]);
const user=JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    const fetchRequests = async () => {
        const user=JSON.parse(localStorage.getItem("user"));
      try {
        const res = await axios.get(`
${import.meta.env.VITE_API_URL}/api/users/connectionrequest/${user.id}`);
        setRequests(res.data);
        console.log(res.data)
      } catch (err) {
        console.error("Error fetching connection requests:", err);
      }
    };
    fetchRequests();
  }, [user.id]);

  const handleDecision = async (id, status) => {
    try {
      await axios.put(`${import.meta.env.VITE_API_URL}/api/users/connectionaccept/${id}`,{ status });
      setRequests(prev => prev.filter(r => r._id !== id)); // remove from list after decision
    } catch (err) {
      console.error("Error updating connection:", err);
    }
  };

  return (
    <div className="p-6 pl-20 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Connection Requests</h1>
      {requests.length === 0 ? (
        <p>No pending connection requests.</p>
      ) : (
        requests.map(req => (
          <div
            key={req._id}
            className="bg-white shadow rounded p-4 mb-3 flex justify-between items-center"
          >
            <div>
              <p className="font-semibold">{req.senderId.name}</p>
              <p className="text-sm text-gray-500">wants to connect with you</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleDecision(req._id, "accepted")}
                className="bg-green-600 text-white px-3 py-1 rounded"
              >
                Accept
              </button>
              <button
                onClick={() => handleDecision(req._id, "rejected")}
                className="bg-red-600 text-white px-3 py-1 rounded"
              >
                Reject
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ConnectionRequest;
