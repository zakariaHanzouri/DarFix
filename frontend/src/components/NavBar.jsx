import { Link } from "react-router-dom";
import UseAuth from "../hooks/UseAuth";
import { useState } from "react";
import { X, Menu } from "lucide-react";
import toast from "react-hot-toast";
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const { user, logout: logoutUser, loading } = UseAuth();
  const handleLogout = async () => {
    try {
      await logoutUser();
    } catch (error) {
      toast.error(error.response?.data?.message || "something went wrong");
    }
  };
  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto h-20 px-6 flex items-center justify-between">
        {/* Left */}
        <div>
          <Link
            to="/"
            className="text-3xl font-black tracking-wide text-white hover:text-indigo-400 transition-colors"
          >
            Dar<span className="text-indigo-500">Fix</span>
          </Link>
        </div>

        {/* Center */}
        <div className="hidden md:flex items-center gap-10">
          <Link
            to="/"
            className="text-slate-300 hover:text-white transition-colors font-medium"
          >
            Home
          </Link>

          <Link
            to="/services"
            className="text-slate-300 hover:text-white transition-colors font-medium"
          >
            Services
          </Link>
        </div>

        {/* Right */}
        <div className=" items-center gap-4  hidden sm:flex">
          <button
            onClick={handleLogout}
            className="w-full rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 py-3 text-white font-semibold"
          >
            {loading ? "Logging out..." : "Logout"}
          </button>
          <p className="text-white font-semibold ">Hi, {user?.name}</p>
        </div>
        {/* Mobile Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-white"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>
      {isOpen && (
        <div className="md:hidden border-t border-white/10 bg-slate-950 px-6 py-6 space-y-5">
          <Link
            to="/"
            onClick={() => setIsOpen(false)}
            className="block text-slate-300 hover:text-white"
          >
            Home
          </Link>

          <Link
            to="/services"
            onClick={() => setIsOpen(false)}
            className="block text-slate-300 hover:text-white"
          >
            Services
          </Link>

          <div className="border-t border-white/10 pt-5">
            <p className="text-white font-semibold mb-4">Hi, {user?.name}</p>

            <button
              onClick={handleLogout}
              className="w-full rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 py-3 text-white font-semibold"
            >
              {loading ? "Logging out..." : "Logout"}
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
