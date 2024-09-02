import { Link } from "react-router-dom";
import { Menu } from "lucide-react"; // Pastikan Anda sudah menginstal lucide-react
import { useState } from "react";

export default function HeaderUser() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-gray-400 shadow-md">
      {/* Desktop Header */}
      <div className="hidden md:flex items-center justify-between p-4">
        <div className="flex items-center space-x-4">
          <img
            src="/image/th-removebg-preview.png" // Ganti dengan path gambar logo Anda
            alt="Kickzone Futsal Logo"
            className="h-12 w-auto" // Atur ukuran sesuai kebutuhan
          />
          <div className="text-2xl font-bold text-gray-800 font-serif">
            Kickzone Futsal
          </div>
        </div>
        <input
          type="text"
          placeholder="Cari di sini"
          className="p-2 border border-gray-300 rounded-md w-full max-w-xs mx-auto"
        />
      </div>

      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between p-4 bg-gray-800 text-white">
        <div className="flex items-center space-x-4">
          <img
            src="/image/th-removebg-preview.png" // Ganti dengan path gambar logo Anda
            alt="Kickzone Futsal Logo"
            className="h-12 w-auto" // Atur ukuran sesuai kebutuhan
          />
          <div className="text-xl font-bold">Kickzone Futsal</div>
          <button onClick={toggleMenu} className="text-white">
            <Menu size={24} />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-gray-800 text-white py-4 font-serif fixed inset-0 z-50">
          <nav className="flex flex-col items-center">
            <ul className="space-y-4">
              <li>
                <Link to="/" className="hover:underline" onClick={toggleMenu}>
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/user/homeUser"
                  className="hover:underline"
                  onClick={toggleMenu}
                >
                  Lapangan
                </Link>
              </li>
              <li>
                <Link
                  to="/user/payment"
                  className="hover:underline"
                  onClick={toggleMenu}
                >
                  Pembayaran
                </Link>
              </li>
              <li>
                <Link
                  to="/wanita"
                  className="hover:underline"
                  onClick={toggleMenu}
                >
                  Jadwal
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      )}

      {/* Desktop Navigation */}
      <div className="hidden md:block bg-gray-800 text-white py-4 font-serif">
        <nav className="flex justify-center">
          <ul className="flex space-x-6">
            <li>
              <Link to="/" className="hover:underline">
                Home
              </Link>
            </li>
            <li>
              <a href="/user/homeUser#lapangan" className="hover:underline">
                Lapangan
              </a>
            </li>
            <li>
              <Link to="/user/pembayaran" className="hover:underline">
                Pembayaran
              </Link>
            </li>
            {/* <li>
              <Link to="/jadwal" className="hover:underline">
                Jadwal
              </Link>
            </li> */}
          </ul>
        </nav>
      </div>
    </header>
  );
}
