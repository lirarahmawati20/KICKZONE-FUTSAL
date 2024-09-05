import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import HeaderAdmin from "./HeaderAdmin";

const DataMember = () => {
  const [me, setUsers] = useState([]);
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    fetch("http://localhost:8080/api/users")
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

  // Toggle menu sidebar
  const handleMenuClick = () => {
    setShowMenu(!showMenu);
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-200 font-serif">
      <Sidebar isVisible={showMenu} />
      <div
        className={`flex-1 ml-0 lg:ml-64 mt-16 p-6 transition-transform duration-300 ${
          showMenu ? "lg:ml-64" : ""
        }`}
      >
        <HeaderAdmin onMenuClick={handleMenuClick} showMenu={showMenu} />
        <main>
          <div className="flex flex-col md:flex-row items-center justify-between mb-4">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 md:mb-2 mt-1 md:mt-5 text-gray-800">
              Daftar Member
            </h2>
          </div>
          <div className="overflow-x-auto shadow-md rounded-lg">
            <table className="min-w-full bg-white border border-gray-200">
              <thead>
                <tr className="bg-gray-800 text-white">
                  <th className="py-3 px-4 text-left border border-gray-300">
                    No
                  </th>
                  <th className="py-3 px-4 text-left border border-gray-300">
                    Nama Lengkap
                  </th>
                  <th className="py-3 px-4 text-left border border-gray-300">
                    Email
                  </th>
                  <th className="py-3 px-4 text-left border border-gray-300">
                    Jenis Kelamin
                  </th>
                  <th className="py-3 px-4 text-left border border-gray-300">
                    No Hp
                  </th>
                  <th className="py-3 px-4 text-left border border-gray-300">
                    Role
                  </th>
                </tr>
              </thead>
              <tbody>
                {me
                  .filter((user) => user.role === "USER")
                  .map((user, index) => (
                    <tr
                      key={user.id}
                      className="hover:bg-gray-300 transition-colors duration-200"
                    >
                      <td className="py-2 px-4 text-gray-900 border border-gray-300">
                        {index + 1}
                      </td>
                      <td className="py-2 px-4 text-gray-700 border border-gray-300">
                        {user.username}
                      </td>
                      <td className="py-2 px-4 text-gray-700 border border-gray-300">
                        {user.email}
                      </td>
                      <td className="py-2 px-4 text-gray-700 border border-gray-300">
                        {user.jenisKelamin}
                      </td>
                      <td className="py-2 px-4 text-gray-700 border border-gray-300">
                        {user.noHp}
                      </td>
                      <td className="py-2 px-4 text-gray-700 border border-gray-300">
                        {user.role}
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
