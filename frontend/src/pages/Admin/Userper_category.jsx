import React, { useEffect, useState } from "react";
import {Chart as ChartJS, CategoryScale,LinearScale,BarElement,Title,Tooltip,Legend,} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
import { Bar } from "react-chartjs-2";
import axios from "axios";

const UsersPerCategoryChart = () => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/admin/users-per-category`);
      const data = res.data;
      console.log(data);

      setChartData({
        labels: data.map(item => item.categoryName),
        datasets: [
          {
            label: "Users per Category",
            data: data.map(item => item.count),
            backgroundColor: ["#3b82f6", "aqua", "#10b981"] // blue, orange, green
          }
        ]
      });
    };
    fetchData();
  }, []);

  return (
    <div className="bg-white shadow rounded w-full h-[400px] flex flex-col items-center justify-center ">
      <h2 className="text-xl font-bold mb-4">Users per Category</h2>
      <div className="w-100 h-60">{chartData && <Bar data={chartData} options={{ maintainAspectRatio: false }} />}</div>
    </div>
  );
};

export default UsersPerCategoryChart;
