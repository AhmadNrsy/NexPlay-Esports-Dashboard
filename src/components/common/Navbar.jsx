import { Search, Bell, Mail, User } from "lucide-react";

const Navbar = () => {
  return (
    <header className="bg-white border-b border-gray-100 flex items-center justify-between px-8 py-4 sticky top-0 z-10">
      {/* Left: Search Bar */}
      <div className="flex-1 max-w-2xl">
        <div className="relative group">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[var(--color-primary)] transition-colors"
            size={20}
          />
          <input
            type="text"
            placeholder="Search rooms, users, or bookings..."
            className="w-full bg-gray-50 border border-gray-200 text-gray-700 rounded-full pl-12 pr-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-soft)] focus:border-[var(--color-primary)] transition-all duration-300"
          />
        </div>
      </div>

      {/* Right: Actions & Profile */}
      <div className="flex items-center gap-6 ml-8">
        <div className="flex items-center gap-4 text-gray-500">
          <button className="relative hover:text-[var(--color-primary)] transition-colors">
            <Bell size={22} />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
          </button>
          <button className="hover:text-[var(--color-primary)] transition-colors">
            <Mail size={22} />
          </button>
        </div>

        <div className="w-px h-8 bg-gray-200"></div>

        {/* Profile Section Tanpa Tombol Logout */}
        <div className="flex items-center gap-3 cursor-pointer group">
          <div className="text-right hidden md:block">
            <div className="text-sm font-bold text-[var(--color-ink-primary)] group-hover:text-[var(--color-primary)] transition-colors">
              Admin NexPlay
            </div>
            <div className="text-xs text-gray-500">Superadmin</div>
          </div>
          <div className="w-10 h-10 rounded-full bg-[var(--color-primary-soft)] text-[var(--color-primary)] flex items-center justify-center border-2 border-transparent group-hover:border-[var(--color-primary)] transition-all">
            <User size={20} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
