// src/components/FieldList.js
import React, { useEffect, useState } from "react";

const FieldList = () => {
  const [fields, setFields] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Mengambil data dari backend
    fetch("http://localhost:8080/api/fields")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setFields(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Terjadi kesalahan saat mengambil data:", error);
        setError(error);
        setLoading(false);
      });
  }, []);

  const handleDelete = (id) => {
    // Fungsi untuk menghapus field
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

  const handleEdit = (id) => {
    // Fungsi untuk mengedit field (harus diimplementasikan lebih lanjut)
    alert(`Edit field dengan ID: ${id}`);
  };

  

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Terjadi kesalahan: {error.message}</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Daftar Fields</h1>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr className="w-full bg-gray-100 border-b border-gray-200">
            <th className="py-2 px-4 text-left">No</th>
            <th className="py-2 px-4 text-left">Photo</th>
            <th className="py-2 px-4 text-left">Field Name</th>
            <th className="py-2 px-4 text-left">Description</th>
            <th className="py-2 px-4 text-left">Price</th>
            <th className="py-2 px-4 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {fields.map((field) => (
            <tr key={field.id} className="border-b border-gray-200">
              <td className="py-2 px-4" >{field.id}</td>
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
  );
};

export default FieldList;
