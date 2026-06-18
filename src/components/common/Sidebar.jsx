import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import {
  LayoutDashboard,
  Users,
  Monitor,
  Cpu,
  CalendarClock,
  CreditCard,
  Settings,
  LogOut,
  Trophy,
} from "lucide-react";

const Sidebar = () => {
  const location = useLocation();
  const { logout } = useAuth();
  const navigate = useNavigate();

  const links = [
    { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    { name: "Users", path: "/users", icon: Users },
    { name: "Gaming Rooms", path: "/gaming-rooms", icon: Monitor },
    { name: "PC Setups", path: "/pc-setups", icon: Cpu },
    { name: "Bookings", path: "/bookings", icon: CalendarClock },
    { name: "Payments", path: "/payments", icon: CreditCard },
  ];

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <aside className="w-[260px] bg-white border-r border-gray-100 flex flex-col h-full z-20">
      {/* Logo Area */}
      <div className="p-6 md:py-8 flex items-center gap-3">
        <div className="w-10 h-10 bg-[var(--color-primary)] text-white rounded-xl flex items-center justify-center font-bold text-xl shadow-lg shadow-indigo-200">
          N
        </div>
        <div>
          <h2 className="font-bold text-[var(--color-ink-primary)] text-lg leading-tight">
            NexPlay
          </h2>
          <p className="text-[10px] text-gray-400 font-medium tracking-wide uppercase">
            Elite Esports Mgmt
          </p>
        </div>
      </div>

      <div className="px-6 mb-2">
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
          Menu
        </p>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 px-4 overflow-y-auto no-scrollbar">
        <ul className="space-y-1">
          {links.map((link) => {
            const Icon = link.icon;
            const isActive = location.pathname.startsWith(link.path);
            return (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className={`flex items-center gap-3 py-2.5 px-4 rounded-xl transition-all duration-200 ${
                    isActive
                      ? "bg-[var(--color-primary-soft)] text-[var(--color-primary)] font-semibold"
                      : "text-gray-500 hover:bg-gray-50 hover:text-[var(--color-ink-primary)]"
                  }`}
                >
                  <Icon size={18} strokeWidth={isActive ? 2.5 : 2} />
                  <span className="text-sm">{link.name}</span>
                  {isActive && (
                    <div className="absolute left-0 w-1 h-8 bg-[var(--color-primary)] rounded-r-full"></div>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Bottom Section */}
      <div className="p-4 border-t border-gray-100 mt-auto">
        <ul className="space-y-1 mb-4">
          <li>
            <button className="w-full flex items-center gap-3 py-2.5 px-4 rounded-xl text-gray-500 hover:bg-gray-50 hover:text-[var(--color-ink-primary)] transition-all text-sm font-medium">
              <Settings size={18} />
              <span>Settings</span>
            </button>
          </li>
          <li>
            {/* LOGOUT BUTTON AKTIF DI SINI */}
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 py-2.5 px-4 rounded-xl text-gray-500 hover:bg-red-50 hover:text-red-600 transition-all text-sm font-medium"
            >
              <LogOut size={18} />
              <span>Logout</span>
            </button>
          </li>
        </ul>

        {/* CTA Button */}
        <button className="w-full bg-[var(--color-primary)] hover:bg-[var(--color-secondary)] text-white py-3 px-4 rounded-xl text-sm font-semibold shadow-md shadow-indigo-200 transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2">
          <Trophy size={16} />
          Book Tournament
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
