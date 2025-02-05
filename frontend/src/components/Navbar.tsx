import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import { logout } from "../redux/slices/authSlice";
import { FiMenu, FiX, FiUser, FiLogOut, FiHome } from "react-icons/fi"; 

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const token =
    useSelector((state: RootState) => state.auth.token) ||
    localStorage.getItem("token");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <div className="relative p-[2px] bg-gradient-to-r from-blue-500 to-purple-500 rounded-[12px] shadow-lg">
      <nav className="bg-white/20 backdrop-blur-lg rounded-[10px] px-6 py-3">
        <div className="container mx-auto flex justify-between items-center">
          <Link
            to="/"
            className="text-white text-2xl font-bold tracking-wide flex items-center gap-2"
          >
            <FiHome size={26} /> MyApp
          </Link>
          <div className="hidden md:flex space-x-6">
            {token ? (
              <>
                <Link
                  to="/dashboard"
                  className="text-white font-medium hover:text-gray-300 transition-all duration-200 flex items-center gap-2"
                >
                  <FiUser size={18} /> Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-white font-medium hover:text-gray-300 transition-all duration-200 flex items-center gap-2"
                >
                  <FiLogOut size={18} /> Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/"
                  className="text-white font-medium hover:text-gray-300 transition-all duration-200"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="text-white font-medium hover:text-gray-300 transition-all duration-200"
                >
                  Register
                </Link>
              </>
            )}
          </div>
          <button
            className="md:hidden text-white"
            onClick={() => setIsOpen(true)}
          >
            <FiMenu size={28} />
          </button>
        </div>
      </nav>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex justify-center items-center"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="bg-white/20 backdrop-blur-lg p-6 rounded-xl shadow-lg w-4/5 max-w-[300px] flex flex-col items-center space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="self-end text-white text-2xl"
              onClick={() => setIsOpen(false)}
            >
              <FiX />
            </button>

            {token ? (
              <>
                <Link
                  to="/dashboard"
                  className="text-white text-lg font-medium flex items-center gap-2"
                  onClick={() => setIsOpen(false)}
                >
                  <FiUser size={20} /> Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-white text-lg font-medium flex items-center gap-2"
                >
                  <FiLogOut size={20} /> Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/"
                  className="text-white text-lg font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="text-white text-lg font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
