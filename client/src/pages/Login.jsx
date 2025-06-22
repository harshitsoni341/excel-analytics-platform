import { useState } from "react";
import API from "../api";
import { useDispatch } from "react-redux";
import { login } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", form);
      localStorage.setItem("token", res.data.token);
      dispatch(login(res.data.user));
      navigate("/dashboard");
    } catch (err) {
      alert(err.response.data.error || "Login failed");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 bg-white p-8 rounded shadow">
      <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="email" type="email" placeholder="Email"
          className="w-full border px-3 py-2 rounded" onChange={handleChange} required />
        <input name="password" type="password" placeholder="Password"
          className="w-full border px-3 py-2 rounded" onChange={handleChange} required />
        <button type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Login</button>
      </form>
      <p className="text-center mt-4">
        Don't have an account? <a className="text-blue-500" href="/register">Register</a>
      </p>
    </div>
  );
};

export default Login;
