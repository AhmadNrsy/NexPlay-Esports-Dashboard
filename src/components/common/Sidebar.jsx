import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, Users, Monitor, Cpu, CalendarClock, CreditCard } from "lucide-react";

const Sidebar = () => {
  const location = useLocation();

  const links = [
    { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    { name: "Users", path: "/users", icon: Users },
    { name: "Gaming Rooms", path: "/gaming-rooms", icon: Monitor },
    { name: "PC Setups", path: "/pc-setups", icon: Cpu },
    { name: "Bookings", path: "/bookings", icon: CalendarClock },
    { name: "Payments", path: "/payments", icon: CreditCard },
  ];

  return (
    <aside className="w-64 bg-[var(--color-surface-sidebar)] border-r border-gray-200 flex flex-col min-h-screen">
      <div className="p-6 text-center text-xl font-bold text-[var(--color-primary)] border-b border-gray-100">
        NexPlay Esports
      </div>
      <nav className="flex-1 mt-6 px-4">
        <ul className="space-y-2">
          {links.map((link) => {
            const Icon = link.icon;
            const isActive = location.pathname.startsWith(link.path);
            return (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className={`flex items-center gap-3 py-3 px-4 rounded-lg transition-colors ${
                    isActive
                      ? "bg-[var(--color-primary-soft)] text-[var(--color-primary)] font-semibold"
                      : "text-[var(--color-ink-secondary)] hover:bg-gray-50 hover:text-[var(--color-primary)] transition-colors"
                  }`}
                >
                  <Icon size={20} />
                  <span>{link.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
