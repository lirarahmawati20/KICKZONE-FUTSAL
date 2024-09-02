import Sidebar from "./Sidebar";
import HeaderAdmin from "./HeaderAdmin";
import { useEffect, useState } from "react";

const DataMember = () => {
  const [user_tbl, setUsers] = useState([]);
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    fetch("http://localhost:8080/api/auth/user_tbl")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Data received:", data);
        setUsers(data);
      })
      .catch((error) => {
        console.error("Terjadi kesalahan saat mengambil data:", error);
      });
  }, []);

  const handleDelete = (id) => {
    fetch(`http://localhost:8080/api/auth/user_tbl/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          setUsers(user_tbl.filter((user) => user.id !== id));
        } else {
          throw new Error("Failed to delete");
        }
      })
      .catch((error) => {
        console.error("Terjadi kesalahan saat menghapus data:", error);
      });
  };

  // Toggle menu sidebar
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4 md:mb-2 mt-1 md:mt-5">
              Daftar Member
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200">
              <thead>
                <tr className="bg-gray-400 border-b border-gray-200">
                  <th className="py-2 px-4 text-left">No</th>
                  <th className="py-2 px-4 text-left">Nama Lengkap</th>
                  <th className="py-2 px-4 text-left">Email</th>
                  <th className="py-2 px-4 text-left">Jenis Kelamin</th>
                  <th className="py-2 px-4 text-left">No Hp</th>
                  <th className="py-2 px-4 text-left">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {user_tbl.map((user, index) => (
                  <tr key={user.id} className="border-b border-gray-200">
                    <td className="py-2 px-4">{index + 1}</td>
                    <td className="py-2 px-4">{user.name}</td>
                    <td className="py-2 px-4">{user.email}</td>
                    <td className="py-2 px-4">{user.jenisKelamin}</td>
                    <td className="py-2 px-4">{user.noHp}</td>
                    <td className="py-2 px-4">
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                      >
                        Hapus
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

export default DataMember;
