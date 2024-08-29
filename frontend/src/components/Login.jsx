import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user"); // Default role is user
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      email === "admin@example.com" &&
      password === "adminpassword" &&
      role === "admin"
    ) {
      alert("Admin login successful!");
      navigate("/admin/homeAdmin"); // Redirect to home page for admin
    } else if (
      email === "user@example.com" &&
      password === "password" &&
      role === "user"
    ) {
      alert("User login successful!");
      navigate("/user/homeUser"); // Redirect to home page for user
    } else {
      setError("Invalid credentials or role");
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
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="role" className="block text-gray-700">
                Role
              </label>
              <select
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            {error && <p className="text-red-500 mb-4">{error}</p>}
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
        {/* Background color or image can be applied here */}
        {/* <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url('/path/to/your/image.jpg')` }}> */}
      </div>
    </div>
  );
};

export default Login;
