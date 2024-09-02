import { TicketPlus } from "lucide-react";
import { useEffect, useState } from "react";
import HeaderAdmin from "./HeaderAdmin";
import Sidebar from "./Sidebar";

const SewaList = () => {
  const [sewa, setSewa] = useState([]);
  // const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showMenu, setShowMenu] = useState(false);

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
        // setLoading(false);
      })
      .catch((error) => {
        console.error("Terjadi kesalahan saat mengambil data:", error);
        setError(error);
        // setLoading(false);
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

  const handleEdit = (id) => {
    alert(`Edit sewa dengan ID: ${id}`);
  };

  const handleMenuClick = () => {
    setShowMenu(!showMenu);
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      <Sidebar isVisible={showMenu} />
      <div
        className={`flex-1 ml-0 lg:ml-64 mt-16 p-6 transition-transform duration-300 ${
          showMenu ? "lg:ml-64" : ""
        }`}
      >
        <HeaderAdmin onMenuClick={handleMenuClick} showMenu={showMenu} />
        <main>
          <div className="flex flex-col md:flex-row items-center justify-between mb-4">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 md:mb-6 mt-10 md:mt-5">
              Daftar Sewa
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200">
              <thead>
                <tr className="bg-gray-300 border-b border-gray-200">
                  <th className="py-3 px-1 text-left">No</th>
                  <th className="py-3 px-4 text-left">Nama pemesan</th>
                  <th className="py-3 px-4 text-left">Nama Lapangan</th>
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
                    <td className="py-2 px-3">{index + 1}</td>
                    <td className="py-2 px-3">
                      {s.user_tbl ? s.user_tbl.name : "user Name Not Available"}
                    </td>
                    <td className="py-2 px-4">
                      {s.field_id
                        ? s.field_id.fieldName
                        : "Field Name Not Available"}
                    </td>
                    <td className="py-2 px-3">{s.tanggalPesan}</td>
                    <td className="py-2 px-3">{s.lamaSewa} jam</td>
                    <td className="py-2 px-3">{s.waktuMulai}</td>
                    <td className="py-2 px-4">{s.waktuBerakhir}</td>
                    <td className="py-2 px-4">Rp {s.total}</td>
                    <td className="py-2 px-4">
                      <button
                        onClick={() => handleEdit(s.id)}
                        className="bg-blue-500 text-white px-2 py-2 rounded "
                      >
                        Status
                      </button>
                      <button
                        onClick={() => handleDelete(s.id)}
                        className="bg-red-500 text-white px-4 py-2 rounded"
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
      </div>
    </div>
  );
};

export default SewaList;
