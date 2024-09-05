import { useEffect, useState } from "react";
import HeaderUser from "./HeaderUser";

export default function Jadwal(){
    const [sewa, setSewa] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
      fetch("http://localhost:8080/api/sewa")
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          setSewa(data);
        })
        .catch((error) => {
          console.error("Terjadi kesalahan saat mengambil data:", error);
          setError(error);
         
        });
    }, []);


    return (
      <>
        <div className="flex flex-col lg:flex-row min-h-screen p-4">
          <main className="flex-1">
            <HeaderUser />

            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-400 rounded-lg shadow-md">
                <thead>
                  <tr className="bg-gray-300 border-b border-gray-400">
                    <th className="py-3 px-4 text-left">No</th>
                    <th className="py-3 px-4 text-left">Nama Pemesan</th>
                    <th className="py-3 px-4 text-left">Nama Lapangan</th>
                    <th className="py-3 px-4 text-left">Tanggal Pesan</th>
                    <th className="py-3 px-4 text-left">Jam Main</th>
                    <th className="py-3 px-4 text-left">Lama Sewa</th>
                    <th className="py-3 px-4 text-left">Jam Habis</th>
                  </tr>
                </thead>
                <tbody>
                  {sewa.map((s, index) => (
                    <tr key={s.id} className="border-b border-gray-200">
                      <td className="py-2 px-4">{index + 1}</td>
                      <td className="py-2 px-4">
                        {s.user_id
                          ? s.user_id.username
                          : "user Name Not Available"}
                      </td>
                      <td className="py-2 px-4">
                        {s.field_id
                          ? s.field_id.fieldName
                          : "Field Name Not Available"}
                      </td>
                      <td className="py-2 px-4">{s.tanggalPesan}</td>
                      <td className="py-2 px-4">{s.lamaSewa} jam</td>
                      <td className="py-2 px-4">{s.waktuMulai}</td>
                      <td className="py-2 px-4">{s.waktuBerakhir}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </main>
        </div>
      </>
    );
}