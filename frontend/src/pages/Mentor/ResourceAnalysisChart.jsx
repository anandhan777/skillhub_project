import React, { useEffect, useState } from "react";
import axios from "axios";
import { Pie, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  ArcElement,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale
);

const ResourceAnalysisChart = ({ mentorId }) => {
  const [analytics, setAnalytics] = useState(null);
  const user=JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/mentor/mentorresourceanalysis/${user.id}`);
        setAnalytics(res.data);
        
      } catch (err) {
        console.error("Error fetching analytics:", err);
      }
    };
    fetchAnalytics();
  }, [mentorId]);

  if (!analytics) return <p>Loading charts...</p>;

  // Pie Chart Data (Resources by Type)
  const pieData = {
    labels: analytics.byType.map((item) => item._id),
    datasets: [
      {
        data: analytics.byType.map((item) => item.count),
        backgroundColor: ["#1e90ff", "#00ffef", "#023eba"]
      }
    ]
  };

  // Line Chart Data (Monthly Trend)
  const lineData = {
    labels: analytics.monthlyTrend.map((item) => item._id),
    datasets: [
      {
        label: "Resources Uploaded",
        data: analytics.monthlyTrend.map((item) => item.count),
        borderColor: "green",
        fill: false
      }
    ]
  };

  return (
    <div className="flex gap-6 p-6 w-[900px] h-[400px]">
     
      <div className="bg-white  rounded p-4 h-[300px] w-[400px]">
        <h3 className="font-bold mb-2">Resources by Type</h3>
        <Pie data={pieData} />
      </div>

     
    </div>
  );
};

export default ResourceAnalysisChart;
