// // src/pages/BookingChart.jsx
// import React from "react";
// import { Bar } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   Title,
//   Tooltip,
//   Legend,
//   BarElement,
//   CategoryScale,
//   LinearScale,
// } from "chart.js";

// // Daftar data booking
// const data = [
//   { tanggalBooking: "2024-01-15", jumlahBooking: 5 },
//   { tanggalBooking: "2024-01-22", jumlahBooking: 8 },
//   { tanggalBooking: "2024-02-10", jumlahBooking: 6 },
//   // Tambah data lainnya
// ];

// // Pengolahan data untuk diagram
// const monthlyData = data.reduce((acc, curr) => {
//   const month = new Date(curr.tanggalBooking).toLocaleString("default", {
//     month: "short",
//     year: "numeric",
//   });
//   if (!acc[month]) {
//     acc[month] = 0;
//   }
//   acc[month] += curr.jumlahBooking;
//   return acc;
// }, {});

// const labels = Object.keys(monthlyData);
// const values = Object.values(monthlyData);

// // Register Chart.js components
// ChartJS.register(
//   Title,
//   Tooltip,
//   Legend,
//   BarElement,
//   CategoryScale,
//   LinearScale
// );

// const BookingChart = () => {
//   const chartData = {
//     labels: labels,
//     datasets: [
//       {
//         label: "Jumlah Booking per Bulan",
//         data: values,
//         backgroundColor: "rgba(75, 192, 192, 0.2)",
//         borderColor: "rgba(75, 192, 192, 1)",
//         borderWidth: 1,
//       },
//     ],
//   };

//   return (
//     <div>
//       <h2 className="text-2xl font-bold mb-4">
//         Diagram Hasil Booking per Bulan
//       </h2>
//       <Bar
//         data={chartData}
//         options={{ responsive: true, maintainAspectRatio: false }}
//       />
//     </div>
//   );
// };

// export default BookingChart;









