import { Instagram, Twitter, Facebook, Menu } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div>
      {/* Header Section */}
      <header className="bg-gray-800 text-white  px-4 md:px-8 lg:px-12 flex justify-between items-center sticky top-0 z-50 ">
        <div
          id="home"
          className="flex items-center text-3xl font-bold font-serif"
        >
          <img
            src="/image/th-removebg-preview.png"
            alt="Kickzone Logo"
            className="h-24 w-24 mr-2"
          />
          <a href="#">KICKZONE FUTSAL</a>
        </div>
        <div className="hidden lg:flex space-x-6 font-serif">
          <a href="#home" className="hover:bg-gray-600 px-4 py-2 rounded">
            Home
          </a>
          <a href="#about" className="hover:bg-gray-600 px-4 py-2 rounded">
            About
          </a>
          <a href="#location" className="hover:bg-gray-600 px-4 py-2 rounded">
            Location
          </a>
          <a href="#contact" className="hover:bg-gray-600 px-4 py-2 rounded">
            Contact
          </a>
        </div>
        <div className="lg:hidden">
          <button
            onClick={toggleMenu}
            aria-label="Toggle Menu"
            className="text-white"
          >
            <Menu />
          </button>
        </div>
        <nav
          className={`lg:hidden ${
            menuOpen ? "block" : "hidden"
          } absolute top-16 left-0 w-full bg-gray-800`}
        >
          <ul className="flex flex-col space-y-2 font-serif">
            <li>
              <a href="#home" className="block px-4 py-2 hover:bg-gray-600">
                Home
              </a>
            </li>
            <li>
              <a href="#about" className="block px-4 py-2 hover:bg-gray-600">
                About
              </a>
            </li>
            <li>
              <a href="#location" className="block px-4 py-2 hover:bg-gray-600">
                Location
              </a>
            </li>
            <li>
              <a href="#contact" className="block px-4 py-2 hover:bg-gray-600">
                Contact
              </a>
            </li>
          </ul>
        </nav>
      </header>

      {/* Hero Section */}
      <div
        className="h-screen w-full flex items-center justify-start bg-cover bg-center"
        style={{
          backgroundImage: "url('/image/wp2124265 (1).jpg')",
        }}
      >
        <div className="text-left ml-6 md:ml-12 lg:ml-24 italic font-serif">
          <h1 className="text-4xl md:text-6xl font-bold text-slate-900 shadow-lg">
            Sehatkan Dirimu
            <p>Dengan Berolahraga</p>
            <p>di Kickzone Futsal</p>
          </h1>
          <div className="flex justify-start space-x-4 mt-6">
            <Link
              to="/login"
              className="bg-amber-500 text-white py-2 px-10 rounded hover:bg-amber-300"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="bg-green-700 text-white py-2 px-10 rounded hover:bg-green-500"
            >
              Register
            </Link>
          </div>
        </div>
      </div>

      {/* About Section */}
      <section id="about" className="py-20 px-6 bg-gray-100">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center">
          <div className="flex-1 mb-9 md:mb-0 relative">
            <div className="relative">
              <img
                src="/image/pngtree-sport-football-background-picture-image_2446912.jpg"
                alt="Lapangan Futsal"
                className="w-full h-auto md:w-96 md:h-80 object-cover rounded shadow-lg"
              />
              <img
                src="/image/pngtree-sport-football-background-picture-image_2446912.jpg"
                alt="Lapangan Futsal"
                className="w-full h-auto md:w-96 md:h-80 object-cover rounded shadow-lg absolute top-2 left-2 md:top-5 md:left-5"
              />
              <img
                src="/image/pngtree-sport-football-background-picture-image_2446912.jpg"
                alt="Lapangan Futsal"
                className="w-full h-auto md:w-96 md:h-80 object-cover rounded shadow-lg absolute top-4 left-4 md:top-10 md:left-10"
              />
            </div>
          </div>
          <div className="flex-1 md:ml-8 font-serif">
            <h2 className="text-3xl font-bold mb-9">Tentang Kami</h2>
            <p className="text-lg mb-9">
              Kickzone Futsal adalah pusat olahraga yang didedikasikan untuk
              meningkatkan kesehatan dan kebugaran masyarakat melalui futsal.
              Kami menyediakan fasilitas futsal modern yang nyaman, serta
              pelatihan yang dirancang untuk semua tingkat kemampuan. Tim kami
              berkomitmen untuk menciptakan lingkungan yang mendukung dan
              menyenangkan untuk bermain futsal dan berolahraga.
            </p>
          </div>
        </div>
      </section>
      {/* Location and Contact Sections */}
      <section className="py-12 px-6 bg-gray-200 font-serif">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row md:space-x-6">
          <div id="location" className="flex-1 mb-6 md:mb-0">
            <h2 className="text-3xl font-bold mb-4">Lokasi Kami</h2>
            <p className="text-lg mb-6">
              Melawai, Kec. Kby. Baru, Kota Jakarta Selatan, Daerah Khusus
              Ibukota Jakarta
            </p>
            <div className="w-full h-64">
              <iframe
                className="w-full h-full rounded shadow-lg"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.1452127610182!2d106.79844027458985!3d-6.244586361145019!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f16ebc9102bb%3A0xae30b5cf06e55303!2sLap.%20Futsal%2C%20Melawai%2C%20Kec.%20Kby.%20Baru%2C%20Kota%20Jakarta%20Selatan%2C%20Daerah%20Khusus%20Ibukota%20Jakarta!5e0!3m2!1sid!2sid!4v1724712228260!5m2!1sid!2sid"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Lokasi Kickzone Futsal"
              ></iframe>
            </div>
          </div>

          <div id="contact" className="flex-1">
            <form className="p-8 rounded ">
              <div className="mb-4">
                <label htmlFor="name" className="block text-slate-950">
                  Nama
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="message" className="block text-gray-700">
                  Pesan
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-6 rounded hover:bg-blue-700"
              >
                Kirim
              </button>
            </form>
          </div>
        </div>
      </section>

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
    </div>
  );
}
