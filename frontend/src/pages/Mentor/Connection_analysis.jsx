import React, { useEffect, useState } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale
} from "chart.js";

ChartJS.register(Title, Tooltip, Legend, LineElement, PointElement, CategoryScale, LinearScale);

const MentorConnectionsChart = ({ mentorId }) => {
  const [analytics, setAnalytics] = useState(null);
  const user=JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await axios.get(`
${import.meta.env.VITE_API_URL}/api/mentor/mentorconnectionanalysis/${user.id}`);
        setAnalytics(res.data);
      } catch (err) {
        console.error("Error fetching connections analytics:", err);
      }
    };
    fetchAnalytics();
  }, [mentorId]);

  if (!analytics) return <p>Loading connections chart...</p>;

  const lineData = {
    labels: analytics.monthlyTrend.map((item) => item._id),
    datasets: [
      {
        label: "Mentees Connected",
        data: analytics.monthlyTrend.map((item) => item.count),
        borderColor: "blue",
        fill: false
      }
    ]
  };

  return (
    <div className="bg-white shadow rounded p-4">
      <h3 className="font-bold mb-2">Mentees Connection Growth</h3>
      <p className="text-lg mb-4">Total Connections: {analytics.totalConnections}</p>
      <Line data={lineData} />
    </div>
  );
};

export default MentorConnectionsChart;
