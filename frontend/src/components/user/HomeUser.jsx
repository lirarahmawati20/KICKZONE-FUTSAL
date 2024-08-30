import { Link } from "react-router-dom";
import {  HandCoins, Handshake, HeartPulse, Laugh} from "lucide-react";
import HeaderUser from "./HeaderUser";
import CarouselUser from "./CarouselUsel";
import { useEffect, useState } from "react";

export default function HomeUser() {
  const [fields, setFields] = useState([]);
   const [isModalOpen, setIsModalOpen] = useState(false);
   const [selectedField, setSelectedField] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8080/api/fields")
      .then((response) => response.json())
      .then((data) => setFields(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);
   const openModal = (field) => {
     setSelectedField(field);
     setIsModalOpen(true);
   };

   const closeModal = () => {
     setIsModalOpen(false);
     setSelectedField(null);
   };

  return (
    <>
      <HeaderUser />
      <CarouselUser />

      <div className="px-6 py-8 bg-white">
        <div className="flex justify-around mb-6">
          <div className="text-center max-w-xs rounded-lg container-bg-2">
            <Handshake size={30} className="text-white mx-auto " />
            <p className="font-semibold">KENYAMANAN </p>
            <p>Mengutamakan kenyamanan penyewa</p>
          </div>

          <div className="text-center max-w-xs rounded-lg container-bg-2 ">
            <Laugh size={30} className="text-white mx-auto" />
            <p className="font-semibold">SETRATEGIS</p>
            <p>Tersedia tempat yang setrategis </p>
          </div>

          <div className="text-center max-w-xsrounded-lg  container-bg-2 ">
            <HandCoins size={30} className="text-white mx-auto" />
            <p className="font-semibold">FREE</p>
            <p>Setiap kendaraan free parkir</p>
          </div>

          <div className="text-center max-w-xsrounded-lg  container-bg-2 ">
            <HeartPulse size={30} className="text-white mx-auto" />
            <p className="font-semibold">FREE TWO</p>
            <p>Menyediakan free minuman 3 botol</p>
          </div>
        </div>

        <div className="text-center mb-6 mt-36 px-7">
          <p className="text-4xl font-semibold">Lapangan Futsal Kickzone</p>
          <p className="text-xl mt-7">
            Lapangan futsal kami menawarkan kenyamanan dan kualitas terbaik,
            dengan fasilitas modern yang menjamin pengalaman bermain yang
            menyenangkan. Permukaan lapangan yang halus dan aman membuat
            pelanggan tertarik untuk kembali bermain, sementara area penonton
            yang nyaman memungkinkan dukungan penuh dari teman dan keluarga.
          </p>
        </div>

        <div className="flex flex-wrap gap-8 justify-center mt-36">
          {fields.map((field, index) => (
            <div
              className="bg-white border border-gray-200 rounded-lg p-5 text-center w-1/4"
              key={index}
            >
              <img
                src={field.photo}
                alt={field.fieldName}
                className="w-full h-52 object-cover mb-4"
              />
              <h2 className="text-lg font-semibold">{field.fieldName}</h2>
              <p className="text-gray-600">Rp {field.price}</p>
              <p>{field.description}</p>
              <div className="m-5 gap-5 flex justify-center">
                <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                  <Link to="/productUser">jadwal</Link>
                </button>
                <button
                  className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  onClick={() => openModal(field)}
                >
                  pesan
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-10 ">
            <img
              src={selectedField?.photo}
              alt={selectedField?.fieldName}
              className="w-full h-40 object-cover mb-4"
            />
            <h2 className="text-xl font-bold mb-4">
              Pesan {selectedField?.fieldName}
            </h2>

            <p>Harga: Rp {selectedField?.price}</p>
            {/* Form pemesanan dengan inputan bersampingan */}
            <div className="mt-4 flex gap-4">
              <div className="flex-1">
                <label className="block mb-2">Tanggal Main</label>
                <input
                  type="date"
                  className="border border-gray-300 p-2 rounded w-full"
                />
              </div>
              <div className="flex-1">
                <label className="block mb-2">Waktu Mulai</label>
                <input
                  type="time"
                  className="border border-gray-300 p-2 rounded w-full"
                />
              </div>
            </div>
            <div className="mt-4 flex gap-4">
              <div className="flex-1">
                <label className="block mb-2">Waktu Berakhir</label>
                <input
                  type="time"
                  className="border border-gray-300 p-2 rounded w-full"
                />
              </div>
              <div className="flex-1">
                <label className="block mb-2">Lama Main (jam)</label>
                <input
                  type="number"
                  className="border border-gray-300 p-2 rounded w-full"
                  min="0"
                  step="0.5"
                  placeholder="Masukkan lama main dalam jam"
                />
              </div>
            </div>

            <div className="mt-6 flex justify-between">
              <button
                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
                onClick={closeModal}
              >
                Batal
              </button>
              <button className="bg-green-500 px-4 py-2 text-white rounded hover:bg-green-600">
                Pesan
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}