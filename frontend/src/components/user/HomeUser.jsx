import { Link } from "react-router-dom";
import {  HandCoins, Handshake, HeartPulse, Laugh} from "lucide-react";
import HeaderUser from "./HeaderUser";
import CarouselUser from "./CarouselUsel";

export default function HomeUser() {
  // Data produk
  const products = [
    {
      image:
        "/image/How the football trend is Shifting towards Middle East_.jpg",
      nama: "Open Toe Heels",
      harga: "Rp 1200.000",
      des: "Lapangan Open Toe Heels",
    },
    {
      image:
        "/image/How the football trend is Shifting towards Middle East_.jpg",
      nama: "Pump Heels",
      harga: "Rp 2.000.000",
      des: "Lapangan Pump Heels ",
    },
    {
      image:
        "/image/How the football trend is Shifting towards Middle East_.jpg",
      nama: "Stiletto Heels",
      harga: "Rp 1.500.000",
      des: "Lapangan Stiletto Heels",
    },
    {
      image:
        "/image/How the football trend is Shifting towards Middle East_.jpg",
      nama: "Block Heels",
      harga: "Rp 700.000",
    },
    {
      image:
        "/image/How the football trend is Shifting towards Middle East_.jpg",
      nama: "Converse All Star",
      harga: "Rp 2.500.000",
    },
  ];

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
          {products.map((product, index) => (
            <div
              className="bg-white border border-gray-200 rounded-lg p-5 text-center w-1/4" // Ubah max-w-md menjadi w-1/4
              key={index}
            >
              <img
                src={product.image}
                alt={product.nama}
                className="w-full h-52 object-cover mb-4"
              />
              <h2 className="text-lg font-semibold">{product.nama}</h2>
              <p className="text-gray-600">{product.harga}</p>
              <p>{product.des}</p>
              <div className="m-5 gap-5 flex justify-center">
                <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                  <Link to="/productUser">jadwal</Link>
                </button>
                <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                  <Link to="/productUser">pesan</Link>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* <Footer /> */}
    </>
  );
}
