import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";

const Navbar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="bg-[var(--color-surface-card)] border-b border-[var(--color-surface-hover)] flex items-center justify-between px-6 py-4">
      <div className="text-[var(--color-ink-primary)] font-semibold text-lg">Admin Portal</div>
      <div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-[var(--color-danger)] hover:bg-[var(--color-danger-soft)] py-2 px-4 rounded-lg text-sm font-medium transition-colors"
        >
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </div>
    </header>
  );
};

export default Navbar;
