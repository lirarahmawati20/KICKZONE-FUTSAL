import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import HeaderAdmin from "./HeaderAdmin";

const DataPembayaran = () => {
  const [payments, setPayments] = useState([]);
  const [error, setError] = useState(null);
  const [showMenu, setShowMenu] = useState(false); // Contoh state untuk sidebar

  // Fungsi untuk mengubah konfirmasi pembayaran
  const updateConfirmation = (id, newConfirmation) => {
    fetch(`http://localhost:8080/api/payment/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ konfirmasi: newConfirmation }),
    })
      .then((response) => {
        if (response.ok) {
          setPayments((prevPayments) =>
            prevPayments.map((payment) =>
              payment.id === id
                ? { ...payment, konfirmasi: newConfirmation }
                : payment
            )
          );
        } else {
          throw new Error("Gagal mengubah status konfirmasi");
        }
      })
      .catch((error) => setError(error));
  };

  const handleMenuClick = () => {
    setShowMenu(!showMenu);
  };

  // Fetch data pembayaran dari backend
  useEffect(() => {
    fetch("http://localhost:8080/api/payment")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Gagal mengambil data pembayaran");
        }
        return response.json();
      })
      .then((data) => setPayments(data))
      .catch((error) => setError(error));
  }, []);
  return (
    <div className="flex flex-col lg:flex-row min-h-screen font-serif">
      <Sidebar isVisible={showMenu} />
      <div
        className={`flex-1 ml-0 lg:ml-64 mt-16 p-6 transition-transform duration-300 ${
          showMenu ? "lg:ml-64" : ""
        }`}
      >
        <HeaderAdmin onMenuClick={handleMenuClick} showMenu={showMenu} />
        <main>
          <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Daftar Pembayaran</h1>

            {error && (
              <p className="text-red-500">Terjadi kesalahan: {error.message}</p>
            )}

            <table className="table-auto w-full border-collapse bg-slate-800 text-white">
              <thead>
                <tr>
                  <th className="border px-4 py-2">No</th>
                  <th className="border px-4 py-2">Nama Sewa</th>
                  <th className="border px-4 py-2">Bukti</th>
                  <th className="border px-4 py-2">Tanggal Upload</th>
                  <th className="border px-4 py-2">Konfirmasi</th>
                  <th className="border px-4 py-2">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((payment, index) => (
                  <tr key={payment.id}>
                    <td className="border px-4 py-2">{index + 1}</td>
                    <td className="border px-4 py-2">{payment.id_sewa.id}</td>
                    <td className="border px-4 py-2">{payment.bukti}</td>
                    <td className="border px-4 py-2">
                      {payment.tanggal_uplode}
                    </td>
                    <td className="border px-4 py-2">{payment.konfirmasi}</td>
                    <td className="border px-4 py-2">
                      {payment.konfirmasi === "belum" ? (
                        <button
                          onClick={() =>
                            updateConfirmation(payment.id, "sudah")
                          }
                          className="bg-green-500 text-white px-4 py-2 rounded"
                        >
                          Konfirmasi
                        </button>
                      ) : (
                        <span>Terkonfirmasi</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DataPembayaran;
