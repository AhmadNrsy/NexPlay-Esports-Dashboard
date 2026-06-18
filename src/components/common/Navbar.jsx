import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="bg-white shadow-md flex items-center justify-between px-6 py-4">
      <div className="text-gray-800 font-semibold text-lg">Admin Portal</div>
      <div>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded text-sm transition-colors"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Navbar;
