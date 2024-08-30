import { TicketPlus } from "lucide-react";
import React, { useEffect, useState } from "react";
import HeaderAdmin from "./HeaderAdmin";
import Sidebar from "./Sidebar";

const FieldList = () => {
  // State untuk menyimpan data fields, loading status, dan error
  const [fields, setFields] = useState([]);
  const [showMenu, setShowMenu] = useState(false);

  // Mengambil data fields dari backend saat komponen pertama kali dimuat
  useEffect(() => {
    fetch("http://localhost:8080/api/fields")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setFields(data);
      })
      .catch((error) => {
        console.error("Terjadi kesalahan saat mengambil data:", error);
      });
  }, []);

  // Fungsi untuk menghapus field
  const handleDelete = (id) => {
    fetch(`http://localhost:8080/api/fields/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          setFields(fields.filter((field) => field.id !== id));
        } else {
          throw new Error("Failed to delete");
        }
      })
      .catch((error) => {
        console.error("Terjadi kesalahan saat menghapus data:", error);
      });
  };

  // Fungsi untuk mengedit field
  const handleEdit = (id) => {
    alert(`Edit field dengan ID: ${id}`);
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4 md:mb-6 mt-10 md:mt-2">
              Daftar Fields
            </h2>
            <button className="flex items-center bg-slate-400 text-white px-4 py-2 rounded mt-4 md:mt-2">
              <TicketPlus size={24} className="mr-2" />
              Add Field
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200">
              <thead>
                <tr className="bg-gray-400 border-b border-gray-200">
                  <th className="py-2 px-4 text-left">No</th>
                  <th className="py-2 px-4 text-left">Photo</th>
                  <th className="py-2 px-4 text-left">Field Name</th>
                  <th className="py-2 px-4 text-left">Description</th>
                  <th className="py-2 px-4 text-left">Price</th>
                  <th className="py-2 px-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {fields.map((field, index) => (
                  <tr key={field.id} className="border-b border-gray-200">
                    <td className="py-2 px-4">{index + 1}</td>
                    <td className="py-2 px-4">
                      <img
                        src={field.photo}
                        alt={field.fieldName}
                        className="w-20 h-12 object-cover rounded-md"
                      />
                    </td>
                    <td className="py-2 px-4">{field.fieldName}</td>
                    <td className="py-2 px-4">{field.description}</td>
                    <td className="py-2 px-4">${field.price.toFixed(2)}</td>
                    <td className="py-2 px-4">
                      <button
                        onClick={() => handleEdit(field.id)}
                        className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(field.id)}
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

export default FieldList;
