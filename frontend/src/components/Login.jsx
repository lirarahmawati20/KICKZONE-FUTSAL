
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

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
      localStorage.setItem("token", data.token);
      Cookies.set("token", data.token);
      localStorage.setItem("role", data.role);
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
    <div className="flex flex-col lg:flex-row h-screen">
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-white p-4 sm:p-8">
        <div className="w-full max-w-sm">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-center">
            Login
          </h2>
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

          <div className="mt-6">
            <Link to="/register" className="text-black hover:underline">
              Register
            </Link>
          </div>
        </div>
      </div>
      <div className="w-full lg:w-1/2 bg-gray-800 flex items-center justify-center p-4">
        <img
          src="/image/football_player_PNG78.png"
          alt="Football Player"
          className="w-full h-auto max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl"
        />
      </div>
    </div>
  );
};

export default Login;
