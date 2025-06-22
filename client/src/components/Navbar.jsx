import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="fixed top-0 w-full bg-gray-800 text-white shadow-md z-50">
      <div className="container mx-auto flex justify-between items-center px-6 py-4">
        <Link to="/" className="text-xl font-bold text-blue-300">Excel Analytics</Link>
        <div className="space-x-4">
          <Link to="/dashboard" className="hover:text-blue-400">Dashboard</Link>
          <Link to="/upload" className="hover:text-blue-400">Upload</Link>
          <Link to="/charts" className="hover:text-blue-400">Charts</Link>
          <Link to="/" className="hover:text-red-400">Logout</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
