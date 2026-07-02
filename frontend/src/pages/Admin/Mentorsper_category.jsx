import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import {Chart as ChartJS, CategoryScale,ArcElement,LinearScale, BarElement,Title,Tooltip,Legend,} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);
import axios from "axios";

const MentorDistributionChart = () => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/mentor/mentors-per-category`);
      const data = res.data;

      setChartData({
        labels: data.map(item => item.categoryName),
        datasets: [
          {
            label: "Mentor Distribution",
            data: data.map(item => item.count),
            backgroundColor: ["#3b82f6", "#f97316", "#10b981", "#ef4444", "#8b5cf6"]
          }
        ]
      });
    };
    fetchData();
  }, []);

  return (
    <div className="bg-white shadow rounded h-[400px] flex flex-col items-center justify-center" >
      <h2 className="text-xl font-bold mb-4">Mentor Distribution by Category</h2>
      <div className="h-60 w-60">{chartData && <Pie data={chartData}  maintainAspectRatio={false}/>}</div>
      
    </div>
  );
};

export default MentorDistributionChart;


 