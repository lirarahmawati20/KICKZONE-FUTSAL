import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Mendaftarkan komponen Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const SalesChart = () => {
  // Data penjualan
  const salesData = [
    { month: "January", total: 50000 },
    { month: "February", total: 40000 },
    { month: "March", total: 90000 },
    { month: "April", total: 70000 },
    { month: "May", total: 90000 },
  ];

  // Konfigurasi data untuk chart
  const data = {
    labels: salesData.map((item) => item.month), // Sumbu X (bulan)
    datasets: [
      {
        label: "Total Penyewaan ",
        data: salesData.map((item) => item.total), // Sumbu Y (total penjualan)
        backgroundColor: "rgba(75, 192, 192, 0.6)", // Warna batang
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  // Opsi untuk chart
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Hasil Penjualan Bulanan",
      },
    },
  };

  return (
    <div>
      {/* <h2>Diagram Hasil Penjualan</h2> */}
      <Bar data={data} options={options} />
    </div>
  );
};
export default SalesChart;
