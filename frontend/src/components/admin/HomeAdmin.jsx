// src/pages/HomeAdmin.jsx
import { useState } from "react";
import Sidebar from "./Sidebar";
import HeaderAdmin from "./HeaderAdmin";
import { HandCoins, Handshake, HeartPulse, Laugh } from "lucide-react";
import FieldList from "./FieldList";

const HomeAdmin = () => {
  const [showMenu, setShowMenu] = useState(false);

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
          <h1 className="text-3xl font-bold mb-6 mt-5 ml-">Home Admin</h1>
          <div className="px-6 py-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {/* Existing Boxes */}
              <div className="text-center bg-teal-500 text-white p-6 rounded-tl-3xl rounded-br-3xl shadow-lg transition-transform hover:scale-105">
                <Handshake size={30} className="mx-auto mb-4" />
                <p className="font-semibold text-xl">Data PEMESAN</p>
                <p>0</p>
              </div>

              <div className="text-center bg-teal-500 text-white p-6 rounded-tl-3xl rounded-br-3xl shadow-lg transition-transform hover:scale-105">
                <Laugh size={30} className="mx-auto mb-4" />
                <p className="font-semibold text-xl">SETRATEGIS</p>
                <p>Tersedia tempat yang strategis</p>
              </div>

              <div className="text-center bg-teal-500 text-white p-6 rounded-tl-3xl rounded-br-3xl shadow-lg transition-transform hover:scale-105">
                <HandCoins size={30} className="mx-auto mb-4" />
                <p className="font-semibold text-xl">FREE</p>
                <p>Setiap kendaraan free parkir</p>
              </div>

              <div className="text-center bg-teal-500 text-white p-6 rounded-tl-3xl rounded-br-3xl shadow-lg transition-transform hover:scale-105">
                <HeartPulse size={30} className="mx-auto mb-4" />
                <p className="font-semibold text-xl">FREE TWO</p>
                <p>Menyediakan free minuman 3 botol</p>
              </div>
            </div>
          </div>
          <FieldList/>
        </main>
      </div>
    </div>
  );
};

export default HomeAdmin;
