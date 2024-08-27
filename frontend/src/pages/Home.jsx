import { Instagram } from "lucide-react";
import { Twitter } from "lucide-react";
import { Facebook } from "lucide-react";

export default function Home() {
  return (
    <div>
      {/* Header Section */}
      <header className="bg-gray-800 text-white py-6 px-9 flex justify-between items-center sticky top-0 z-50">
        <div className="text-2xl font-bold">
          <a href="#">KICKZONE FUTSAL</a>
        </div>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <a href="Home" className="hover:text-gray-400">
                Home
              </a>
            </li>
            <li>
              <a href="#about" className="hover:text-gray-400">
                About
              </a>
            </li>
            <li>
              <a href="#location" className="hover:text-gray-400">
                Location
              </a>
            </li>
          </ul>
        </nav>
      </header>

      <div
        className="h-screen w-full flex items-center justify-start bg-cover bg-center"
        style={{
          backgroundImage:
            "url('/image/How the football trend is Shifting towards Middle East_.jpg')",
        }}
      >
        <div className="text-left ml-12">
          <h1 className="judul text-4xl md:text-6xl font-bold shadow-lg">
            Sehatkan Dirimu
            <p>Dengan Berolahraga</p>
            <p>di Kickzone Futsal</p>
          </h1>
          <div className="flex justify-start space-x-4 mt-6">
            <button className="button-login bg-blue-500 text-white py-2 px-6 rounded hover:bg-blue-700">
              Login
            </button>
            <button className="button-login bg-green-500 text-white py-2 px-6 rounded hover:bg-green-700">
              Register
            </button>
          </div>
        </div>
      </div>

      <section id="about" className="py-20 px-6 bg-gray-100">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center">
          {/* Image Section */}
          <div className="flex-1 mb-9 md:mb-0">
            <img
              src="/image/Jumlah-Pemain-Sepak-Bola-dalam-Pertandingan-Resmi-Lengkap-dengan-Posisi-dan-Fungsinya.jpg"
              alt="Lapangan Futsal"
              className="w-full h-auto md:w-96 md:h-72 object-cover rounded shadow-lg"
            />
          </div>
          {/* Text Section */}
          <div className="flex-1 md:ml-8">
            <h2 className="text-3xl font-bold mb-4">Tentang Kami</h2>
            <p className="text-lg">
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
      <section className="py-12 px-6 bg-gray-200">
        <div className="max-w-4xl mx-auto flex space-x-6">
          {/* Location Section */}
          <div id="location" className="flex-1">
            <h2 className="text-3xl font-bold mb-4">Lokasi Kami</h2>
            <div className="flex items-center mb-6">
              <p className="text-lg">
                Melawai, Kec. Kby. Baru, Kota Jakarta Selatan, Daerah Khusus
                Ibukota Jakarta
              </p>
            </div>
            {/* Google Maps Embed */}
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

          {/* Contact Section */}
          <div id="contact" className="flex-1">
            <form className="p-8 rounded ">
              <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700">
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

      <footer className="bg-gray-800 text-white py-6 px-6">
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
