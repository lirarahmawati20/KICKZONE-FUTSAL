import { TicketPlus } from "lucide-react";
import { useEffect, useState } from "react";
import HeaderAdmin from "./HeaderAdmin";
import Sidebar from "./Sidebar";

const FieldList = () => {
  const [fields, setFields] = useState([]);
  const [showMenu, setShowMenu] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentField, setCurrentField] = useState({
    id: null,
    photo: "",
    fieldName: "",
    description: "",
    price: "",
  });

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

  const handleAdd = () => {
    setCurrentField({
      id: null,
      photo: "",
      fieldName: "",
      description: "",
      price: "",
    });
    setIsEditing(false);
    setShowModal(true);
  };

  const handleEdit = (field) => {
    setCurrentField(field);
    setIsEditing(true);
    setShowModal(true);
  };

  const handleSave = () => {
    const url = isEditing
      ? `http://localhost:8080/api/fields/${currentField.id}`
      : "http://localhost:8080/api/fields";
    const method = isEditing ? "PUT" : "POST";

    fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(currentField),
    })
      .then(() => {
        window.location.reload();
        setShowModal(false);
      })
      .then((data) => {
        if (isEditing) {
          setFields(
            fields.map((field) => (field.id === currentField.id ? data : field))
          );
        } else {
          setFields([...fields, data]);
        }
      })
      .catch((error) => {
        console.error("Terjadi kesalahan saat menyimpan data:", error);
      });
  };

  const handleMenuClick = () => {
    setShowMenu(!showMenu);
  };

  console.log(fields);
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4 md:mb-6 mt-10 md:mt-2">
              Daftar Fields
            </h2>
            <button
              onClick={handleAdd}
              className="flex items-center bg-slate-800 text-white px-4 py-2 rounded mt-4 md:mt-2"
            >
              <TicketPlus size={24} className="mr-2" />
              Add Field
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200">
              <thead>
                <tr className="bg-gray-800 border-b border-gray-200 text-white">
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
                  <tr key={field?.id} className="border-b border-gray-200">
                    <td className="py-2 px-4">{index + 1}</td>
                    <td className="py-2 px-4">
                      <img
                        src={field?.photo}
                        alt={field?.fieldName}
                        className="w-20 h-12 object-cover rounded-md"
                      />
                    </td>
                    <td className="py-2 px-4">{field?.fieldName}</td>
                    <td className="py-2 px-4">{field?.description}</td>
                    <td className="py-2 px-4">${field?.price}</td>
                    <td className="py-2 px-4">
                      <button
                        onClick={() => handleEdit(field)}
                        className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(field?.id)}
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

      {/* Modal untuk tambah/edit field */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 font-serif">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-2xl font-bold mb-4">
              {isEditing ? "Edit Field" : "Add Field"}
            </h2>
            <label className="block mb-2">Photo URL</label>
            <input
              type="text"
              value={currentField.photo}
              onChange={(e) =>
                setCurrentField({ ...currentField, photo: e.target.value })
              }
              className="w-full p-2 border border-gray-300 rounded mb-4"
            />
            <label className="block mb-2">Field Name</label>
            <input
              type="text"
              value={currentField.fieldName}
              onChange={(e) =>
                setCurrentField({ ...currentField, fieldName: e.target.value })
              }
              className="w-full p-2 border border-gray-300 rounded mb-4"
            />
            <label className="block mb-2">Description</label>
            <textarea
              value={currentField.description}
              onChange={(e) =>
                setCurrentField({
                  ...currentField,
                  description: e.target.value,
                })
              }
              className="w-full p-2 border border-gray-300 rounded mb-4"
            />
            <label className="block mb-2">Price</label>
            <input
              type="number"
              value={currentField.price}
              onChange={(e) =>
                setCurrentField({ ...currentField, price: e.target.value })
              }
              className="w-full p-2 border border-gray-300 rounded mb-4"
            />
            <div className="flex justify-end">
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-300 text-black px-4 py-2 rounded mr-2"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="bg-green-500 text-white px-4 py-2 rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FieldList;
