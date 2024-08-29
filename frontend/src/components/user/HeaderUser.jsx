import { Link } from "react-router-dom";

export default function HeaderUser() {
  return (
    <header className="bg-gray-100 shadow-md">
      <div className="flex items-center justify-between p-4">
        <div className="text-2xl font-bold">Kickzone Futsal</div>
        <input
          type="text"
          placeholder="Cari di sini"
          className="p-2 border border-gray-300 rounded-md w-full max-w-xs mx-auto"
        />
      </div>
      <div className="bg-gray-600 text-white py-4">
        <nav className="flex justify-center">
          <ul className="flex space-x-6">
            <li>
              <Link to="/" className="hover:underline">
                Home
              </Link>
            </li>
            <li>
              <Link to="/anak-anak" className="hover:underline">
                Lapanagan
              </Link>
            </li>
            <li>
              <Link to="/pria" className="hover:underline">
                Pembayaran
              </Link>
            </li>
            <li>
              <Link to="/wanita" className="hover:underline">
                jadwal
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
