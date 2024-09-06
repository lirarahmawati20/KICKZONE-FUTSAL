
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
    <div className="flex flex-col lg:flex-row h-screen">
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-white p-4 sm:p-8">
        <div className="w-full max-w-md p-6 sm:p-8">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-center">
            Sign Up
          </h2>
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
                <option value="">Pilih Role</option>
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
            <Link to="/login" className="text-gray-800 hover:underline">
              Already have an account? Login
            </Link>
          </div>
        </div>
      </div>
      <div className="w-full lg:w-1/2 bg-gray-800 flex items-center justify-center p-4">
        <img
          src="/image/football_player_PNG78.png"
          alt="Illustration"
          className="w-full h-auto max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl"
        />
      </div>
    </div>
  );
}
