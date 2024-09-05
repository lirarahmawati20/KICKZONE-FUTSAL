import { TicketPlus } from "lucide-react";
import { useEffect, useState } from "react";
import HeaderUser from "./HeaderUser";

const Pembayaran = () => {
  const [sewa, setSewa] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPaymentCompleted, setIsPaymentCompleted] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState({});

  useEffect(() => {
    fetch("http://localhost:8080/api/sewa")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setSewa(data);
      })
      .catch((error) => {
        console.error("Terjadi kesalahan saat mengambil data:", error);
      });
  }, []);

  const handleDelete = (id) => {
    fetch(`http://localhost:8080/api/sewa/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          setSewa(sewa.filter((s) => s.id !== id));
        } else {
          throw new Error("Failed to delete");
        }
      })
      .catch((error) => {
        console.error("Terjadi kesalahan saat menghapus data:", error);
      });
  };

  const handleBayarClick = (payment) => {
    setSelectedPayment(payment);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPayment(null);
    setIsPaymentCompleted(false); // Reset status pembayaran selesai
  };

  const handleSavePayment = () => {

    setPaymentStatus((prevStatus) => ({
      ...prevStatus,
      [selectedPayment.id]: "Selesai",
    }));

    setIsPaymentCompleted(true); // Set status pembayaran selesai
   
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen p-4">
      <main className="flex-1">
        <HeaderUser />

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-400 rounded-lg shadow-md">
            <thead>
              <tr className="bg-gray-300 border-b border-gray-400">
                <th className="py-3 px-4 text-left">No</th>
                <th className="py-3 px-4 text-left">Nama Lapangan</th>
                <th className="py-3 px-4 text-left">Tanggal Pesan</th>
                <th className="py-3 px-4 text-left">Lama Sewa</th>
                <th className="py-3 px-4 text-left">Jam Mulai</th>
                <th className="py-3 px-4 text-left">Jam Berakhir</th>
                <th className="py-3 px-4 text-left">Total</th>
                <th className="py-3 px-4 text-left">Kompirmasi</th>
              </tr>
            </thead>
            <tbody>
              {sewa.map((s, index) => (
                <tr key={s.id} className="border-b border-gray-400">
                  <td className="py-2 px-4">{index + 1}</td>
                  <td className="py-2 px-4">
                    {s.field_id
                      ? s.field_id.fieldName
                      : "Field Name Not Available"}
                  </td>
                  <td className="py-2 px-4">
                    {new Date(s.tanggalPesan).toLocaleDateString()}
                  </td>
                  <td className="py-2 px-4">{s.lamaSewa} jam</td>
                  <td className="py-2 px-4">{s.waktuMulai}</td>
                  <td className="py-2 px-4">{s.waktuBerakhir}</td>
                  <td className="py-2 px-4">Rp {s.total}</td>
                  <td className="py-2 px-4">
                    <button
                      onClick={() => handleBayarClick(s)}
                      className={`${
                        paymentStatus[s.id] === "Selesai"
                          ? "bg-green-500"
                          : "bg-blue-500"
                      } text-white px-4 py-2 rounded mr-2 hover:${
                        paymentStatus[s.id] === "Selesai"
                          ? "bg-green-600"
                          : "bg-blue-600"
                      }`}
                      disabled={paymentStatus[s.id] === "Selesai"}
                    >
                      {paymentStatus[s.id] === "Selesai" ? "Selesai" : "Bayar"}
                    </button>
                    <button
                      onClick={() => handleDelete(s.id)}
                      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>

      {isModalOpen && !isPaymentCompleted && selectedPayment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">Detail Pembayaran</h2>
            <p>Nama Lapangan: {selectedPayment.field_id?.fieldName}</p>
            <p>
              Tanggal Pesan:{" "}
              {new Date(selectedPayment.tanggalPesan).toLocaleDateString()}
            </p>
            <p>Harga: Rp {selectedPayment.harga}</p>
            <p>Total: Rp {selectedPayment.total}</p>
            

            <div className="mt-4 flex gap-4">
              <div className="flex-1">
                <label className="block mb-2">Bukti Pembayaran</label>
                <input
                  type="file"
                  className="border border-gray-500 p-2 rounded w-full"
                />
              </div>
            </div>
            <p className="border-spacing-4 border-4 justify-center mt-3 p-2 text-center">Setatus belum bayar </p>

            <div className="mt-6 flex justify-between">
              <button
                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
                onClick={closeModal}
              >
                Batal
              </button>
              <button
                className="bg-green-500 px-4 py-2 text-white rounded hover:bg-green-600"
                onClick={handleSavePayment}
              >
                Simpan
              </button>
            </div>
          </div>
        </div>
      )}

      {isPaymentCompleted && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">Pembayaran Selesai</h2>
            <p>Terima kasih, pembayaran Anda telah berhasil diproses!</p>
            <div className="mt-6 flex justify-center">
              <button
                className="bg-green-500 px-4 py-2 text-white rounded hover:bg-green-600"
                onClick={closeModal}
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Pembayaran;

