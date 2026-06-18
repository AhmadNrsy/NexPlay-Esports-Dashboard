import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();

  const links = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Users", path: "/users" },
    { name: "Gaming Rooms", path: "/gaming-rooms" },
    { name: "PC Setups", path: "/pc-setups" },
    { name: "Bookings", path: "/bookings" },
    { name: "Payments", path: "/payments" },
  ];

  return (
    <aside className="w-64 bg-gray-800 text-white flex flex-col min-h-screen">
      <div className="p-4 text-center text-xl font-bold border-b border-gray-700">
        NexPlay Esports
      </div>
      <nav className="flex-1 mt-4">
        <ul>
          {links.map((link) => (
            <li key={link.path}>
              <Link
                to={link.path}
                className={`block py-3 px-6 hover:bg-gray-700 transition-colors ${
                  location.pathname === link.path
                    ? "bg-gray-700 border-l-4 border-blue-500"
                    : ""
                }`}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
