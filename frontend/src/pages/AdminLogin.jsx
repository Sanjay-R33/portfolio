import { useState, useContext } from "react";
import API from "../services/api";
import { AuthContext } from "../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const [form, setForm] = useState({ username: "", password: "" });
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await API.post("/auth/login", form);
    login(res.data.token);

    navigate("/admin/dashboard");
  };

  return (
    <div className="flex items-center justify-center h-screen bg-black text-white">
      <form onSubmit={handleSubmit} className="bg-gray-900 p-6 rounded-xl">
        <h2 className="text-2xl mb-4">Admin Login</h2>

        <input
          placeholder="Username"
          className="block mb-3 p-2 w-full bg-gray-800"
          onChange={(e) => setForm({ ...form, username: e.target.value })}
        />

        <input
          type="password"
          placeholder="Password"
          className="block mb-3 p-2 w-full bg-gray-800"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button className="bg-green-500 px-4 py-2 w-full">Login</button>
      </form>
    </div>
  );
}