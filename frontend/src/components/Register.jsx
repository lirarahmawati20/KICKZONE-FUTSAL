import { useState } from "react";
import { Link } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [gender, setGender] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && email && password && phone && address && gender) {
      alert("Registration successful!");
    } else {
      setError("All fields are required");
    }
  };

  return (
    <div className="flex h-screen">
      <div className="w-1/2 flex items-center justify-center bg-white">
        <div className="w-full max-w-md p-10">
          <h2 className="text-4xl font-bold mb-8 text-center">Sign Up</h2>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <label htmlFor="name" className="block text-gray-700">
                  Nama Lengkap
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-gray-700">
                  No Hp
                </label>
                <input
                  type="tel"
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
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
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                  required
                />
              </div>
              <div className="col-span-2">
                <label htmlFor="email" className="block text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                  required
                />
              </div>
              <div className="col-span-2">
                <label htmlFor="address" className="block text-gray-700">
                  Alamat
                </label>
                <textarea
                  id="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                  required
                />
              </div>
              <div className="col-span-2">
                <label htmlFor="gender" className="block text-gray-700">
                  Jenis Kelamin
                </label>
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="male"
                    name="gender"
                    value="male"
                    onChange={(e) => setGender(e.target.value)}
                    className="mr-2"
                  />
                  <label htmlFor="male" className="mr-6">
                    Laki-Laki
                  </label>
                  <input
                    type="radio"
                    id="female"
                    name="gender"
                    value="female"
                    onChange={(e) => setGender(e.target.value)}
                    className="mr-2"
                  />
                  <label htmlFor="female">Perempuan</label>
                </div>
              </div>
            </div>
            {error && <p className="text-red-500 mt-4">{error}</p>}
            <button
              type="submit"
              className="w-full mt-6 bg-gray-800 text-white py-2 px-4 rounded hover:bg-gray-500"
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
      <div className="w-1/2 bg-gray-800 flex items-center justify-center">
        <img src="/image/football_player_PNG78.png" alt="" />
      </div>
    </div>
  );
};

export default Register;
