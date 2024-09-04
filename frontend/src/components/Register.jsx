// import { useState } from "react";
// import { Link } from "react-router-dom";

// const Register = () => {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [phone, setPhone] = useState("");
//   const [address, setAddress] = useState("");
//   const [gender, setGender] = useState("");
//   const [error, setError] = useState("");

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (name && email && password && phone && address && gender) {
//       alert("Registration successful!");
//     } else {
//       setError("All fields are required");
//     }
//   };

//   return (
//     <div className="flex h-screen">
//       <div className="w-1/2 flex items-center justify-center bg-white">
//         <div className="w-full max-w-md p-10">
//           <h2 className="text-4xl font-bold mb-8 text-center">Sign Up</h2>
//           <form onSubmit={handleSubmit}>
//             <div className="grid grid-cols-2 gap-4">
//               <div className="col-span-2">
//                 <label htmlFor="name" className="block text-gray-700">
//                   Nama Lengkap
//                 </label>
//                 <input
//                   type="text"
//                   id="name"
//                   value={name}
//                   onChange={(e) => setName(e.target.value)}
//                   className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
//                   required
//                 />
//               </div>
//               <div>
//                 <label htmlFor="phone" className="block text-gray-700">
//                   No Hp
//                 </label>
//                 <input
//                   type="tel"
//                   id="phone"
//                   value={phone}
//                   onChange={(e) => setPhone(e.target.value)}
//                   className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
//                   required
//                 />
//               </div>
//               <div>
//                 <label htmlFor="password" className="block text-gray-700">
//                   Password
//                 </label>
//                 <input
//                   type="password"
//                   id="password"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
//                   required
//                 />
//               </div>
//               <div className="col-span-2">
//                 <label htmlFor="email" className="block text-gray-700">
//                   Email
//                 </label>
//                 <input
//                   type="email"
//                   id="email"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
//                   required
//                 />
//               </div>
//               <div className="col-span-2">
//                 <label htmlFor="address" className="block text-gray-700">
//                   Alamat
//                 </label>
//                 <textarea
//                   id="address"
//                   value={address}
//                   onChange={(e) => setAddress(e.target.value)}
//                   className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
//                   required
//                 />
//               </div>
//               <div className="col-span-2">
//                 <label htmlFor="gender" className="block text-gray-700">
//                   Jenis Kelamin
//                 </label>
//                 <div className="flex items-center">
//                   <input
//                     type="radio"
//                     id="male"
//                     name="gender"
//                     value="male"
//                     onChange={(e) => setGender(e.target.value)}
//                     className="mr-2"
//                   />
//                   <label htmlFor="male" className="mr-6">
//                     Laki-Laki
//                   </label>
//                   <input
//                     type="radio"
//                     id="female"
//                     name="gender"
//                     value="female"
//                     onChange={(e) => setGender(e.target.value)}
//                     className="mr-2"
//                   />
//                   <label htmlFor="female">Perempuan</label>
//                 </div>
//               </div>
//             </div>
//             {error && <p className="text-red-500 mt-4">{error}</p>}
//             <button
//               type="submit"
//               className="w-full mt-6 bg-gray-800 text-white py-2 px-4 rounded hover:bg-gray-500"
//             >
//               Sign Up
//             </button>
//           </form>
//           <div className="mt-6 text-center">
//             <Link to="/login" className="text-gray-800 hover:underline">
//               Already have an account? Login
//             </Link>
//           </div>
//         </div>
//       </div>
//       <div className="w-1/2 bg-gray-800 flex items-center justify-center">
//         <img src="/image/football_player_PNG78.png" alt="" />
//       </div>
//     </div>
//   );
// };

// export default Register;




// import { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";

// export default function Register() {
//   const [formData, setFormData] = useState({
//     email: "",
//     username: "",
//     password: "",
//     jenisKelamin:"",
//     noHp:"",
//     role: "", // Set default role to USER
//   });

//   const [errMsg, setErrMsg] = useState("");
//   const [showError, setShowError] = useState(false);
//   const [showSuccess, setShowSuccess] = useState(false);
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const { email, username, password, role } = formData;

//     try {
//       const response = await fetch("http://localhost:8080/api/auth/sign-up", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ email, username, password, role }),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         setShowSuccess(true);
//         setErrMsg("Successfully registered");
//         navigate("/login");
//       } else {
//         setShowError(true);
//         setErrMsg(data.message);
//       }
//     } catch (error) {
//       setShowError(true);
//       setErrMsg(`Server error! ${error}`);
//     }
//   };

//   return (
//     <div className="flex h-screen">
//       <div className="w-1/2 flex items-center justify-center bg-white">
//         <div className="w-full max-w-md p-10">
//           <h2 className="text-4xl font-bold mb-8 text-center">Sign Up</h2>
//           {showError && (
//             <div className="alert bg-red-200 text-red-800 p-4 rounded mb-4">
//               <p className="danger">
//                 <span className="font-bold">Alert!</span> {errMsg}
//               </p>
//             </div>
//           )}
//           {showSuccess && (
//             <div className="alert bg-green-200 text-green-800 p-4 rounded mb-4">
//               <p className="success">
//                 <span className="font-bold">Success!</span> {errMsg}
//               </p>
//             </div>
//           )}
//           <form onSubmit={handleSubmit} className="space-y-4">
//             <div>
//               <label htmlFor="email" className="block text-gray-700">
//                 Email
//               </label>
//               <input
//                 type="email"
//                 name="email"
//                 placeholder="email@example.com"
//                 value={formData.email}
//                 onChange={handleChange}
//                 className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
//                 required
//               />
//             </div>
//             <div>
//               <label htmlFor="username" className="block text-gray-700">
//                 Username
//               </label>
//               <input
//                 type="text"
//                 name="username"
//                 placeholder="username"
//                 value={formData.username}
//                 onChange={handleChange}
//                 className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
//                 required
//               />
//             </div>
//             <div>
//               <label htmlFor="password" className="block text-gray-700">
//                 Password
//               </label>
//               <input
//                 type="password"
//                 name="password"
//                 placeholder="password"
//                 value={formData.password}
//                 onChange={handleChange}
//                 className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
//                 required
//               />
//             </div>
//             <div>
//               <label htmlFor="role" className="block text-gray-700">
//                 Role
//               </label>
//               <select
//                 name="role"
//                 value={formData.role}
//                 onChange={handleChange}
//                 className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
//               >
//                 <option value="USER">User</option>
//                 <option value="ADMIN">Admin</option>
//               </select>
//             </div>
//             <button
//               type="submit"
//               className="w-full mt-6 bg-gray-800 text-white py-2 px-4 rounded hover:bg-gray-600 transition duration-300"
//             >
//               Sign Up
//             </button>
//           </form>
//           <div className="mt-6 text-center">
//             <Link to="/signIn" className="text-gray-800 hover:underline">
//               Already have an account? Login
//             </Link>
//           </div>
//         </div>
//       </div>
//       <div className="w-1/2 bg-gray-800 flex items-center justify-center">
//         <img src="/image/football_player_PNG78.png" alt="Illustration" />
//       </div>
//     </div>
//   );
// }

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    jenisKelamin: "",
    noHp: "",
    role: "", // Set default role to USER
  });

  const [errMsg, setErrMsg] = useState("");
  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, username, password, jenisKelamin, noHp, role } = formData;

    try {
      const response = await fetch("http://localhost:8080/api/auth/sign-up", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          username,
          password,
          jenisKelamin,
          noHp,
          role,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setShowSuccess(true);
        setErrMsg("Successfully registered");
        navigate("/login");
      } else {
        setShowError(true);
        setErrMsg(data.message);
      }
    } catch (error) {
      setShowError(true);
      setErrMsg(`Server error! ${error}`);
    }
  };

  return (
    <div className="flex h-screen">
      <div className="w-1/2 flex items-center justify-center bg-white">
        <div className="w-full max-w-md p-10">
          <h2 className="text-4xl font-bold mb-8 text-center">Sign Up</h2>
          {showError && (
            <div className="alert bg-red-200 text-red-800 p-4 rounded mb-4">
              <p className="danger">
                <span className="font-bold">Alert!</span> {errMsg}
              </p>
            </div>
          )}
          {showSuccess && (
            <div className="alert bg-green-200 text-green-800 p-4 rounded mb-4">
              <p className="success">
                <span className="font-bold">Success!</span> {errMsg}
              </p>
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                placeholder="email@example.com"
                value={formData.email}
                onChange={handleChange}
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                required
              />
            </div>
            <div>
              <label htmlFor="username" className="block text-gray-700">
                Username
              </label>
              <input
                type="text"
                name="username"
                placeholder="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-gray-700">
                Password
              </label>
              <input
                type="password"
                name="password"
                placeholder="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                required
              />
            </div>
            <div>
              <label htmlFor="jenisKelamin" className="block text-gray-700">
                Jenis Kelamin
              </label>
              <select
                name="jenisKelamin"
                value={formData.jenisKelamin}
                onChange={handleChange}
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                <option value="">Pilih Jenis Kelamin</option>
                <option value="Laki-laki">Laki-laki</option>
                <option value="Perempuan">Perempuan</option>
              </select>
            </div>
            <div>
              <label htmlFor="noHp" className="block text-gray-700">
                Nomor HP
              </label>
              <input
                type="text"
                name="noHp"
                placeholder="08xxxxxxxxxx"
                value={formData.noHp}
                onChange={handleChange}
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                required
              />
            </div>
            <div>
              <label htmlFor="role" className="block text-gray-700">
                Role
              </label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                <option value="USER">User</option>
                <option value="ADMIN">Admin</option>
              </select>
            </div>
            <button
              type="submit"
              className="w-full mt-6 bg-gray-800 text-white py-2 px-4 rounded hover:bg-gray-600 transition duration-300"
            >
              Sign Up
            </button>
          </form>
          <div className="mt-6 text-center">
            <Link to="/signIn" className="text-gray-800 hover:underline">
              Already have an account? Login
            </Link>
          </div>
        </div>
      </div>
      <div className="w-1/2 bg-gray-800 flex items-center justify-center">
        <img src="/image/football_player_PNG78.png" alt="Illustration" />
      </div>
    </div>
  );
}
