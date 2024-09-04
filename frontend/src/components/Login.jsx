// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [role, setRole] = useState("user"); // Default role is user
//   const [error, setError] = useState("");
//   const navigate = useNavigate(); // Initialize useNavigate hook

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     fetch(
//       `http://localhost:8080/api/auth/sign-in?email=${email}&password=${password}`,
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//       }
//     )
//       .then((response) => {
//         if (response.ok) {
//           // return response.json();
//           fetch("http://localhost:8080/api/auth/me",{
//             method:"GET",
//             credentials:"include"})
          
//             .then((response) => response.json())
//             .then((data) => {
//               console.log(data);
//               navigate("/admin/homeAdmin");
//             })
//             .catch((error) =>
//               console.error("Error fetching field data:", error)
//             );
//         } else {
//           throw new Error("Failed to add job");
//         }
//       })
//       .catch((error) => console.error("Error adding job:", error));
//   };

//   // if (
//   //   email === "admin@example.com" &&
//   //   password === "adminpassword" &&
//   //   role === "admin"
//   // ) {
//   //   alert("Admin login successful!");
//   //   navigate("/admin/homeAdmin"); // Redirect to home page for admin
//   // } else if (
//   //   email === "user@example.com" &&
//   //   password === "password" &&
//   //   role === "user"
//   // ) {
//   //   alert("User login successful!");
//   //   navigate("/user/homeUser"); // Redirect to home page for user
//   // } else {
//   //   setError("Invalid credentials or role");
//   // }
//   // };

//   return (
//     <div className="flex h-screen">
//       <div className="w-1/2 flex items-center justify-center bg-white">
//         <div className="w-full max-w-sm p-8">
//           <h2 className="text-6xl font-bold mb-6 text-center">Login</h2>
//           <p className="text-center text-gray-600 mb-6">
//             Log in with your data
//           </p>
//           <form onSubmit={handleSubmit}>
//             <div className="mb-4">
//               <label htmlFor="email" className="block text-gray-700">
//                 Email
//               </label>
//               <input
//                 type="email"
//                 id="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500"
//                 required
//               />
//             </div>
//             <div className="mb-4">
//               <label htmlFor="password" className="block text-gray-700">
//                 Password
//               </label>
//               <input
//                 type="password"
//                 id="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500"
//                 required
//               />
//             </div>
//             <div className="mb-4">
//               <label htmlFor="role" className="block text-gray-700">
//                 Role
//               </label>
//               <select
//                 id="role"
//                 value={role}
//                 onChange={(e) => setRole(e.target.value)}
//                 className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500"
//               >
//                 <option value="user">User</option>
//                 <option value="admin">Admin</option>
//               </select>
//             </div>
//             {error && <p className="text-red-500 mb-4">{error}</p>}
//             <button
//               type="submit"
//               className="w-full bg-gray-800 text-white py-2 px-4 rounded hover:bg-gray-500"
//             >
//               Sign In
//             </button>
//           </form>

//           <div className="mt-6 flex justify-between">
//             <Link to="/register" className="text-gray-800 hover:underline">
//               Register
//             </Link>
//             <Link to="/logout" className="text-gray-800 hover:underline">
//               Logout
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

// export default Login;


import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errMsg, setErrMsg] = useState("");
  const [showError, setShowError] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;

    try {
      const response = await fetch("http://localhost:8080/api/auth/sign-in", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        setShowError(true);
        setErrMsg("Email atau password salah!");
        return;
      }

      const data = await response.json();

      if (data.role === "ADMIN") {
        navigate("/admin/homeAdmin"); // Mengarahkan ke dashboard admin
      } else {
        navigate("/user/homeUser"); // Mengarahkan ke halaman user biasa
      }
    } catch (error) {
      setShowError(true);
      setErrMsg(`Terjadi kesalahan pada server!,${error}`);
    }
  };
  return (
    <div className="flex h-screen">
      <div className="w-1/2 flex items-center justify-center bg-white">
        <div className="w-full max-w-sm p-8">
          <h2 className="text-6xl font-bold mb-6 text-center">Login</h2>
          <p className="text-center text-gray-600 mb-6">
            Log in with your data
          </p>
          {showError && (
            <div className="alert bg-red-200 text-red-800 p-4 rounded mb-4">
              <p className="danger">
                <span className="font-bold">Alert!</span> {errMsg}
              </p>
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-700">
                Password
              </label>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-gray-800 text-white py-2 px-4 rounded hover:bg-gray-500"
            >
              Sign In
            </button>
          </form>

          <div className="mt-6 flex justify-between">
            <Link to="/register" className="text-gray-800 hover:underline">
              Register
            </Link>
            <Link to="/logout" className="text-gray-800 hover:underline">
              Logout
            </Link>
          </div>
        </div>
      </div>
      <div className="w-1/2 bg-gray-800 flex items-center justify-center">
        <img src="/image/football_player_PNG78.png" alt="" />
      </div>
    </div>
  );
};

export default Login;
