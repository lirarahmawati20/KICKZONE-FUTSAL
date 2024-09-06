import Sidebar from "./Sidebar";
import HeaderAdmin from "./HeaderAdmin";
import { useEffect, useState } from "react";
import { TicketPlus } from "lucide-react";
import { SquarePen } from "lucide-react";

const DataAdmin = () => {
  const [me, setUsers] = useState([]);
  const [showMenu, setShowMenu] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8080/api/users")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setUsers(data);
      })
      .catch((error) => {
        console.error("Terjadi kesalahan saat mengambil data:", error);
      });
  }, []);

  const handleMenuClick = () => {
    setShowMenu(!showMenu);
  };

  const handleAddClick = () => {
    setIsEditing(false);
    setCurrentUser(null);
    setIsModalOpen(true);
  };

  const handleEditClick = (user) => {
    setIsEditing(true);
    setCurrentUser(user);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const url = isEditing
      ? `http://localhost:8080/api/users/${currentUser.id}`
      : "http://localhost:8080/api/users";

    const method = isEditing ? "PUT" : "POST";
    const data = new FormData(e.target);

    fetch(url, {
      method: method,
      body: JSON.stringify(Object.fromEntries(data)),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(() => {
        //  console.log.info(response);
        window.location.reload();
      })
      // .then((data) => {
      //   setIsModalOpen(false);
      //   // Update the user list
      //   if (isEditing) {
      //     setUsers((prevUsers) =>
      //       prevUsers.map((user) => (user.id === data.id ? data : user))
      //     );
      //   } else {
      //     setUsers((prevUsers) => [...prevUsers, data]);
      //   }
      // })
      .catch((error) => {
        console.error("Terjadi kesalahan saat menyimpan data:", error);
      });
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
            <button
              className="flex items-center bg-slate-800 text-white px-4 py-2 rounded mt-4 md:mt-2"
              onClick={handleAddClick}
            >
              <TicketPlus size={24} className="mr-2" />
              Add Field
            </button>
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
                  <th className="py-3 px-4 text-left border border-gray-300">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody>
                {me
                  .filter((user) => user.role === "ADMIN")
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
                      <td className="py-2 px-4 text-gray-700 border border-gray-300">
                        <button
                          className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                          onClick={() => handleEditClick(user)}
                        >
                          <SquarePen />
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded shadow-lg max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">
              {isEditing ? "Edit Data" : "Tambah Data"}
            </h2>
            <form onSubmit={handleFormSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700">Nama Lengkap</label>
                <input
                  type="text"
                  name="username"
                  defaultValue={isEditing ? currentUser.username : ""}
                  className="w-full px-4 py-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  defaultValue={isEditing ? currentUser.email : ""}
                  className="w-full px-4 py-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Jenis Kelamin</label>
                <select
                  name="jenisKelamin"
                  defaultValue={isEditing ? currentUser.jenisKelamin : ""}
                  className="w-full px-4 py-2 border rounded"
                  required
                >
                  <option value="Laki-laki">Laki-laki</option>
                  <option value="Perempuan">Perempuan</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">No Hp</label>
                <input
                  type="text"
                  name="noHp"
                  defaultValue={isEditing ? currentUser.noHp : ""}
                  className="w-full px-4 py-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Role</label>
                <select
                  name="role"
                  defaultValue={isEditing ? currentUser.role : "ADMIN"}
                  className="w-full px-4 py-2 border rounded"
                  required
                >
                  <option value="ADMIN">ADMIN</option>
                  <option value="USER">USER</option>
                </select>
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-500 text-white rounded mr-2"
                  onClick={handleCloseModal}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded"
                >
                  {isEditing ? "Update" : "Tambah"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataAdmin;
