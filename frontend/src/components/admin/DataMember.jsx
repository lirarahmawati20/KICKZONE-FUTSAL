import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import HeaderAdmin from "./HeaderAdmin";

const DataMember = () => {
  const [users, setUsers] = useState([]);
  const [showMenu, setShowMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortType, setSortType] = useState("nameAsc");

  // Fetch user data from the backend
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

  // Sorting and filtering logic
  const sortedAndFilteredUsers = users
    .filter((user) =>
      user.username.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortType === "nameAsc") {
        return a.username.localeCompare(b.username);
      } else if (sortType === "nameDesc") {
        return b.username.localeCompare(a.username);
      } else if (sortType === "emailAsc") {
        return a.email.localeCompare(b.email);
      } else if (sortType === "emailDesc") {
        return b.email.localeCompare(a.email);
      }
      return 0;
    });

  // Request sort type change
  const handleSortChange = (type) => {
    setSortType(type);
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
            <input
              type="text"
              placeholder="Search by name"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="p-2 border border-gray-900 rounded"
            />
            <select
              value={sortType}
              onChange={(e) => handleSortChange(e.target.value)}
              className="p-2 border border-gray-800 rounded ml-4"
            >
              <option value="nameAsc">Sort by Name (A-Z)</option>
              <option value="nameDesc">Sort by Name (Z-A)</option>
              <option value="emailAsc">Sort by Email (A-Z)</option>
              <option value="emailDesc">Sort by Email (Z-A)</option>
            </select>
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
                {sortedAndFilteredUsers
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
