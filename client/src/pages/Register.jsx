import { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await API.post("/auth/register", form);
      alert("Registered successfully");
      navigate("/");
    } catch (err) {
      alert(err.response.data.error || "Registration failed");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 bg-white p-8 rounded shadow">
      <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="name" placeholder="Name"
          className="w-full border px-3 py-2 rounded" onChange={handleChange} required />
        <input name="email" type="email" placeholder="Email"
          className="w-full border px-3 py-2 rounded" onChange={handleChange} required />
        <input name="password" type="password" placeholder="Password"
          className="w-full border px-3 py-2 rounded" onChange={handleChange} required />
        <button type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">Register</button>
      </form>
      <p className="text-center mt-4">
        Already have an account? <a className="text-blue-500" href="/">Login</a>
      </p>
    </div>
  );
};

export default Register;
