import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import HeaderAdmin from "./HeaderAdmin";
import { Trash2 } from "lucide-react";

const SewaList = () => {
  const [sewa, setSewa] = useState([]);
  const [error, setError] = useState(null);
  const [showMenu, setShowMenu] = useState(false);

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

  const handleMenuClick = () => {
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    const fetchFields = async () => {
      // const token = localStorage.getItem('token');
      const response = await fetch("http://localhost:8080/api/sewa", {
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${token}`,
        },
      });
      const res = await response.json();
      setSewa(res);
    };
    fetchFields();
  });

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
          <div className="flex flex-col md:flex-row items-center justify-between mb-4">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 md:mb-6 mt-10 md:mt-5">
              Daftar Sewa
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300">
              <thead>
                <tr className="bg-gray-800 border-b border-gray-300 text-white">
                  <th className="py-3 px-4 border border-gray-300 text-left">
                    No
                  </th>
                  <th className="py-3 px-4 border border-gray-300 text-left">
                    Nama pemesan
                  </th>
                  <th className="py-3 px-4 border border-gray-300 text-left">
                    Nama Lapangan
                  </th>
                  <th className="py-3 px-4 border border-gray-300 text-left">
                    Tanggal Pesan
                  </th>
                  <th className="py-3 px-4 border border-gray-300 text-left">
                    Lama Sewa
                  </th>
                  <th className="py-3 px-4 border border-gray-300 text-left">
                    Jam Mulai
                  </th>
                  <th className="py-3 px-4 border border-gray-300 text-left">
                    Jam Berakhir
                  </th>
                  <th className="py-3 px-4 border border-gray-300 text-left">
                    Total
                  </th>
                  <th className="py-3 px-4 border border-gray-300 text-left">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {sewa
                  .filter((s) => s.user_id !== undefined && s.user_id !== null)
                  .map((s, index) => (
                    <tr key={s.id} className="border-b border-gray-300">
                      <td className="py-2 px-4 border border-gray-300">
                        {index + 1}
                      </td>
                      <td className="py-2 px-4 border border-gray-300 text-center">
                        {s.user_id
                          ? s.user_id.username
                          : "User Name Not Available"}
                      </td>
                      <td className="py-2 px-4 border border-gray-300">
                        {s.field_id
                          ? s.field_id.fieldName
                          : "Field Name Not Available"}
                      </td>
                      <td className="py-2 px-4 border border-gray-300">
                        {s.tanggalPesan}
                      </td>
                      <td className="py-2 px-4 border border-gray-300">
                        {s.lamaSewa} jam
                      </td>
                      <td className="py-2 px-4 border border-gray-300">
                        {s.waktuMulai}
                      </td>
                      <td className="py-2 px-4 border border-gray-300">
                        {s.waktuBerakhir}
                      </td>
                      <td className="py-2 px-4 border border-gray-300">
                        Rp {s.total}
                      </td>
                      <td className="py-2 px-4 border border-gray-300 flex space-x-2">
                        <button
                          onClick={() => handleDelete(s.id)}
                          className="bg-red-500 text-white px-3 py-2 rounded"
                        >
                          <Trash2 />
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
