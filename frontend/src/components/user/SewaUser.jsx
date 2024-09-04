import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

export default function SewaUser() {
  const { fieldId } = useParams(); // Mengambil ID field dari URL
  const [field, setField] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8080/api/fields/${fieldId}`)
      .then((response) => response.json())
      .then((data) => setField(data))
      .catch((error) => console.error("Error fetching field data:", error));
  }, [fieldId]);

  // if (!field) {
  //   return <div>Loading...</div>;
  // }

  fetch("http://localhost:8080/api/sewa", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dataToSend),
  })
    .then((response) => {
      if (!response.ok) {
        return response.text().then((text) => {
          throw new Error(text);
        });
      }
      return response.json();
    })
    .then((data) => {
      console.log("Booking successful:", data);
      closeModal();
    })
    .catch((error) => console.error("Error saving booking:", error.message));




  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg w-96">
        <img
          src={field.photo}
          alt={field.fieldName}
          className="w-full h-52 object-cover mb-4"
        />
        <h2 className="text-xl font-bold mb-4">Pesan {field.fieldName}</h2>

        <p>Harga: Rp {field.price}</p>
        <div className="mt-4">
          <label className="block mb-2">Tanggal Main {field.price}</label>
          <input
            type="date"
            className="border border-gray-300 p-2 rounded w-full"
          />
        </div>
        <div className="mt-4">
          <label className="block mb-2">Lama Main (jam)</label>
          <input
            type="number"
            className="border border-gray-300 p-2 rounded w-full"
            min="0"
            step="0.5"
            placeholder="Masukkan lama main dalam jam"
          />
        </div>

        <div className="mt-6 flex justify-between">
          <button
            className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
            onClick={() => window.history.back()}
          >
            Batal
          </button>
          <button className="bg-green-500 px-4 py-2 text-white rounded hover:bg-green-600">
            Pesan
          </button>
        </div>
      </div>
    </div>
  );
}
