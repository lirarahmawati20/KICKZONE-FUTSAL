import { TicketPlus } from "lucide-react";
import Sidebar from "./Sidebar";
import HeaderAdmin from "./HeaderAdmin";
import { useState } from "react";

const DataMember = () => {
//   const [fields, setFields] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
   const [showMenu, setShowMenu] = useState(false);

//   useEffect(() => {
//     fetch("http://localhost:8080/api/fields")
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error("Network response was not ok");
//         }
//         return response.json();
//       })
//       .then((data) => {
//         setFields(data);
//       })
//       .catch((error) => {
//         console.error("Terjadi kesalahan saat mengambil data:", error);
//         setError(error);
//       });
//   }, []);

  // Fungsi untuk menghapus field
//   const handleDelete = (id) => {
//     fetch(`http://localhost:8080/api/fields/${id}`, {
//       method: "DELETE",
//     })
//       .then((response) => {
//         if (response.ok) {
//           setFields(fields.filter((field) => field.id !== id));
//         } else {
//           throw new Error("Failed to delete");
//         }
//       })
//       .catch((error) => {
//         console.error("Terjadi kesalahan saat menghapus data:", error);
//       });
//   };




  // Toggle menu sidebar
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
          <div className="flex flex-col md:flex-row items-center justify-between mb-4">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 md:mb-2 mt-1 md:mt-5">
              Daftar Member
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200">
              <thead>
                <tr className="bg-gray-400 border-b border-gray-200">
                  <th className="py-2 px-4 text-left">No</th>
                  <th className="py-2 px-4 text-left">Nama Lengkap</th>
                  <th className="py-2 px-4 text-left">Jenis Kelamin</th>
                  <th className="py-2 px-4 text-left">Email</th>
                  <th className="py-2 px-4 text-left">No hp</th>
                  <th className="py-2 px-4 text-left">Aksi</th>
                </tr>
              </thead>
              
            </table>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DataMember;
