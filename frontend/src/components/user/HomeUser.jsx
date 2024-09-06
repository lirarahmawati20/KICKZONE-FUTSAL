import { Link } from "react-router-dom";
import {
  Facebook,
  HandCoins,
  Handshake,
  HeartPulse,
  Instagram,
  Laugh,
  Twitter,
} from "lucide-react";
import HeaderUser from "./HeaderUser";
import CarouselUser from "./CarouselUsel";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

export default function HomeUser() {
  const [fields, setFields] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedField, setSelectedField] = useState(null);
  const [tanggalPesan, setTanggalMain] = useState("");
  const [lamaSewa, setDurasiMain] = useState("");
  const [waktuMulai, setWaktuMulai] = useState("");
  const [waktuBerakhir, setWaktuBerakhir] = useState("");
  const [sortType, setSortType] = useState("default"); // State for sorting
  const [searchQuery, setSearchQuery] = useState(""); // State for search

  useEffect(() => {
    fetch("http://localhost:8080/api/fields/get ")
      .then((response) => response.json())
      .then((data) => setFields(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  // Open modal for booking 
  const openModal = (field) => {
    setSelectedField(field);
    setIsModalOpen(true);
  };

  // Close booking modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedField(null);
    setTanggalMain("");
    setDurasiMain("");
    setWaktuMulai("");
    setWaktuBerakhir("");
  };

  // Sorting 
  const sortedAndFilteredFields = fields
    .filter((field) =>
      field.fieldName.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortType === "priceAsc") {
        return a.price - b.price;
      } else if (sortType === "priceDesc") {
        return b.price - a.price;
      } else if (sortType === "nameAsc") {
        return a.fieldName.localeCompare(b.fieldName);
      } else if (sortType === "nameDesc") {
        return b.fieldName.localeCompare(a.fieldName);
      }
      return 0;
    });


  const handleBooking = () => {
    const userId = jwtDecode(localStorage.getItem("token"));
    const bookingData = {
      id: null,
      field_id: { id: selectedField.id },
      user_id: userId,
      tanggalPesan: tanggalPesan,
      lamaSewa: lamaSewa,
      waktuMulai: waktuMulai,
      waktuBerakhir: waktuBerakhir,
    };


    console.log("Booking Data:", bookingData); 
    fetch("http://localhost:8080/api/sewa", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bookingData),
    })
      .then(() => {
        alert("Pemesanan berhasil!");
        closeModal(); 
        window.location.reload(); 
      })
      .catch((error) => {
        console.error("Error saving data:", error);
        alert("Pemesanan gagal. Silakan coba lagi.");
      });
  };

  return (
    <>
      <HeaderUser />
      <CarouselUser />

      <div className="px-6 py-8 bg-slate-100">
        <div className="flex flex-wrap justify-around mb-6 gap-6">
          <div className="text-center max-w-xs rounded-lg container-bg-2 shadow-2xl p-6">
            <Handshake size={30} className="text-white mx-auto mb-2" />
            <p className="font-semibold">KENYAMANAN</p>
            <p>Mengutamakan kenyamanan penyewa</p>
          </div>

          <div className="text-center max-w-xs rounded-lg container-bg-2 shadow-2xl p-6">
            <Laugh size={30} className="text-white mx-auto mb-2" />
            <p className="font-semibold">STRATEGIS</p>
            <p>Tersedia tempat yang strategis</p>
          </div>

          <div className="text-center max-w-xs rounded-lg container-bg-2 shadow-2xl p-6">
            <HandCoins size={30} className="text-white mx-auto mb-2" />
            <p className="font-semibold">FREE</p>
            <p>Setiap kendaraan free parkir</p>
          </div>

          <div className="text-center max-w-xs rounded-lg container-bg-2 shadow-2xl p-6">
            <HeartPulse size={30} className="text-white mx-auto mb-2" />
            <p className="font-semibold">FREE DRINKS</p>
            <p>Menyediakan free minuman 3 botol</p>
          </div>
        </div>

        {/* Introduction Section */}
        <div className="text-center mb-6 mt-28 px-7 mx-auto">
          <p className="text-4xl font-semibold font-serif">
            Lapangan Kickzone Futsal
          </p>
          <p className="text-2xl mt-7 font-serif">
            Nikmati pengalaman bermain sepak bola yang tak tertandingi dengan
            menyewa lapangan kami! Lapangan kami dirancang untuk memberikan
            performa terbaik dengan permukaan yang terawat dan fasilitas modern.
            Baik untuk pertandingan santai bersama teman atau turnamen resmi,
            lapangan kami menyediakan lingkungan yang nyaman dan mendukung.
            Dapatkan akses mudah dengan lokasi strategis dan parkir yang
            memadai. Bergabunglah dengan kami dan ciptakan momen berharga di
            lapangan sepak bola terbaik. Hubungi kami sekarang untuk pemesanan
            dan rasakan sendiri perbedaannya!
          </p>
        </div>

        {/* Search and Sorting Controls */}
        <div className="flex flex-col sm:flex-row justify-between items-center bg-slate-700 p-10 rounded-lg my-20 mx-auto w-full">
          <input
            type="text"
            placeholder="Cari lapangan..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border border-gray-300 rounded-lg p-2 mb-4 sm:mb-0 w-full sm:w-1/3 bg-white"
          />

          <div className="flex gap-4">
            <select
              value={sortType}
              onChange={(e) => setSortType(e.target.value)}
              className="border border-gray-300 rounded-lg p-2 bg-white"
            >
              <option value="default">Urutkan berdasarkan</option>
              <option value="priceAsc">Harga: Rendah ke Tinggi</option>
              <option value="priceDesc">Harga: Tinggi ke Rendah</option>
              <option value="nameAsc">Nama: A-Z</option>
              <option value="nameDesc">Nama: Z-A</option>
            </select>
          </div>
        </div>

        {/* Fields Section */}
        <div
          id="lapangan"
          className="flex flex-wrap gap-8 justify-center mt-28 font-serif"
        >
          {sortedAndFilteredFields.map((field, index) => (
            <div
              className="border rounded-lg p-5 text-center w-full sm:w-80 md:w-1/3 lg:w-1/4 shadow-2xl mb-10 bg-slate-200"
              key={index}
            >
              <img
                src={field.photo}
                alt={field.fieldName}
                className="w-full h-52 object-cover mb-4 mt-2"
              />
              <h2 className="text-lg font-semibold">{field.fieldName}</h2>
              <p className="text-gray-600">Rp {field.price}</p>
              <p>{field.description}</p>
              <div className="mt-4 flex flex-wrap justify-center gap-4">
                <Link to="/user/jadwal">
                  <button className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-400">
                    Jadwal
                  </button>
                </Link>
                <button
                  className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-400"
                  onClick={() => openModal(field)}
                >
                  Sewa
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6 px-6 font-serif">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center">
          {/* Contact Information */}
          <div className="mb-6 md:mb-0">
            <h3 className="text-xl font-semibold mb-2">Kontak Kami</h3>
            <p className="text-lg">
              Jl. Melawai, Kec. Kby. Baru, Kota Jakarta Selatan
            </p>
            <p className="text-lg">Daerah Khusus Ibukota Jakarta</p>
            <p className="text-lg">Email: info@kickzonefutsal.com</p>
            <p className="text-lg">Telepon: 0838-2108-1737</p>
          </div>

          {/* Social Media Links */}
          <div className="flex space-x-4 mb-6 md:mb-0">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-white"
            >
              <Facebook />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-white"
            >
              <Twitter />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-white"
            >
              <Instagram />
            </a>
          </div>

          {/* Copyright */}
          <div className="text-center">
            <p className="text-lg">
              &copy; {new Date().getFullYear()} Kickzone Futsal. All rights
              reserved.
            </p>
          </div>
        </div>
      </footer>

      {isModalOpen && selectedField && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-lg mx-2 w-full h-auto">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">
              Booking {selectedField.fieldName}
            </h2>
            <img
              src={selectedField.photo}
              alt={selectedField.fieldName}
              className="w-full h-40 object-cover rounded mb-4"
            />
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-1">
                Nama Lapangan:
              </label>
              <p className="text-gray-900">{selectedField.fieldName}</p>
            </div>
            <div className="flex gap-4 mb-4">
              <div className="flex-1">
                <label className="block text-gray-700 font-medium mb-1">
                  Tanggal Main:
                </label>
                <input
                  type="date"
                  value={tanggalPesan}
                  onChange={(e) => setTanggalMain(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="flex gap-4 mb-4">
                <div className="flex-1">
                  <label className="block text-gray-700 font-medium mb-1">
                    Durasi Main (jam):
                  </label>
                  <input
                    type="number"
                    value={lamaSewa}
                    onChange={(e) => setDurasiMain(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-4 mb-4">
              <div className="flex-1">
                <label className="block text-gray-700 font-medium mb-1">
                  Waktu Mulai:
                </label>
                <input
                  type="time"
                  value={waktuMulai}
                  onChange={(e) => setWaktuMulai(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="flex-1">
                <label className="block text-gray-700 font-medium mb-1">
                  Waktu Berakhir:
                </label>
                <input
                  type="time"
                  value={waktuBerakhir}
                  onChange={(e) => setWaktuBerakhir(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>
            <div className="flex justify-between mt-6">
              <button
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
                onClick={handleBooking}
              >
                Pesan
              </button>
              <button
                className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-300"
                onClick={closeModal}
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}