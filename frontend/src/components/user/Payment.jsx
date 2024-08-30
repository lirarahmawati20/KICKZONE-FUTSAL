import { TicketPlus } from "lucide-react";
import { useEffect, useState } from "react";
import HeaderUser from "./HeaderUser";

const Payment = () => {
  const [sewa, setSewa] = useState([]);
  // const [isModalOpen, setIsModalOpen] = useState(false);
  // const [selectedPayment, setSelectedPayment] = useState(null);


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

  return (
    <div className="flex flex-col lg:flex-row min-h-screen p-4">
      <main className="flex-1">
        <HeaderUser />

        {/* <div className="flex flex-col md:flex-row items-center justify-between mb-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 md:mb-6 mt-1 md:mt-5">
            Daftar Sewa
          </h2>
        </div> */}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
            <thead>
              <tr className="bg-gray-300 border-b border-gray-200">
                <th className="py-3 px-4 text-left">No</th>
                <th className="py-3 px-4 text-left">Field Name</th>
                <th className="py-3 px-4 text-left">Tanggal Pesan</th>
                <th className="py-3 px-4 text-left">Lama Sewa</th>
                <th className="py-3 px-4 text-left">Jam Mulai</th>
                <th className="py-3 px-4 text-left">Jam Berakhir</th>
                <th className="py-3 px-4 text-left">Total</th>
                <th className="py-3 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {sewa.map((s, index) => (
                <tr key={s.id} className="border-b border-gray-200">
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
                    <button className="bg-blue-500 text-white px-4 py-2 rounded mr-2 hover:bg-blue-600">
                      Bayar
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

      {/* {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-10 ">
            <img
              src={selectedField?.photo}
              alt={selectedField?.fieldName}
              className="w-full h-40 object-cover mb-4"
            />
            <h2 className="text-xl font-bold mb-4">
              Pesan {selectedField?.fieldName}
            </h2>

            <p>Harga: Rp {selectedField?.price}</p>
             <div className="mt-4 flex gap-4">
              <div className="flex-1">
                <label className="block mb-2">Tanggal Main</label>
                <input
                  type="date"
                  className="border border-gray-300 p-2 rounded w-full"
                />
              </div>
              <div className="flex-1">
                <label className="block mb-2">Waktu Mulai</label>
                <input
                  type="time"
                  className="border border-gray-300 p-2 rounded w-full"
                />
              </div>
            </div>
            <div className="mt-4 flex gap-4">
              <div className="flex-1">
                <label className="block mb-2">Waktu Berakhir</label>
                <input
                  type="time"
                  className="border border-gray-300 p-2 rounded w-full"
                />
              </div>
              <div className="flex-1">
                <label className="block mb-2">Lama Main (jam)</label>
                <input
                  type="number"
                  className="border border-gray-300 p-2 rounded w-full"
                  min="0"
                  step="0.5"
                  placeholder="Masukkan lama main dalam jam"
                />
              </div>
            </div>

            <div className="mt-6 flex justify-between">
              <button
                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
                onClick={closeModal}
              >
                Batal
              </button>
              <button className="bg-green-500 px-4 py-2 text-white rounded hover:bg-green-600">
                Pesan
              </button>
            </div>
          </div>
        </div>
      )} */}
    </div>
  );
};

export default Payment;
