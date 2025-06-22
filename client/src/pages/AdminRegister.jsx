import { useState } from "react";
import API from "../api";

const AdminRegister = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await API.post("/auth/register", { ...form, isAdmin: true });
      alert("Admin registered successfully");
    } catch (err) {
      alert(err.response.data.error || "Admin registration failed");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 bg-white p-8 rounded shadow">
      <h2 className="text-2xl font-bold mb-6 text-center text-red-600">Admin Register</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="name" placeholder="Name"
          className="w-full border px-3 py-2 rounded" onChange={handleChange} required />
        <input name="email" type="email" placeholder="Email"
          className="w-full border px-3 py-2 rounded" onChange={handleChange} required />
        <input name="password" type="password" placeholder="Password"
          className="w-full border px-3 py-2 rounded" onChange={handleChange} required />
        <button type="submit"
          className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700">Register Admin</button>
      </form>
    </div>
  );
};

export default AdminRegister;
