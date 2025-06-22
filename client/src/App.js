import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminRegister from "./pages/AdminRegister";
import Dashboard from "./pages/Dashboard";
import Upload from "./pages/Upload";
import Charts from "./pages/Charts";
import Navbar from "./components/Navbar";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="pt-16 px-4 sm:px-6 lg:px-8">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin" element={<AdminRegister />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/charts" element={<Charts />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
