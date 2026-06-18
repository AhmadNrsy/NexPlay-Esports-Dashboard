import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import statisticsService from "../services/statisticsService";
import bookingsService from "../services/bookingsService"; // <-- IMPORT BARU
import {
  Gamepad2,
  Monitor,
  Wallet,
  Users,
  ArrowUpRight,
  ArrowRight,
  MoreVertical,
  Plus,
} from "lucide-react";

// (DashboardSkeleton tetep sama, gw skip biar ga kepanjangan)
const DashboardSkeleton = () => (
  <div className="animate-pulse space-y-6">
    <div className="h-64 bg-gray-200 rounded-2xl w-full md:w-2/3"></div>
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-32 bg-gray-200 rounded-xl"></div>
          ))}
        </div>
        <div className="h-64 bg-gray-200 rounded-xl"></div>
      </div>
      <div className="space-y-6">
        <div className="h-64 bg-gray-200 rounded-xl"></div>
        <div className="h-64 bg-gray-200 rounded-xl"></div>
      </div>
    </div>
  </div>
);

const Dashboard = () => {
  const [stats, setStats] = useState({
    activeBookings: 0,
    availableRooms: 0,
    revenue: 0,
    totalBookings: 0,
  });

  // STATE BARU BUAT RECENT BOOKINGS
  const [recentBookings, setRecentBookings] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Tarik data statistik DAN data bookings berbarengan
        const [activeData, roomsData, revenueData, totalData, bookingsData] =
          await Promise.all([
            statisticsService.getActiveBookings(),
            statisticsService.getAvailableRooms(),
            statisticsService.getRevenue(),
            statisticsService.getTotalBookings(),
            bookingsService.getAllBookings(), // <-- TARIK DATA SINI
          ]);

        setStats({
          activeBookings:
            activeData?.data?.active_bookings ??
            activeData?.active_bookings ??
            0,
          availableRooms:
            roomsData?.data?.available_rooms ?? roomsData?.available_rooms ?? 0,
          revenue: revenueData?.data?.revenue ?? revenueData?.revenue ?? 0,
          totalBookings:
            totalData?.data?.total_bookings ?? totalData?.total_bookings ?? 0,
        });

        // Simpan 4 booking paling awal/akhir ke state
        const allBookings = bookingsData?.data || bookingsData || [];
        setRecentBookings(allBookings.slice(0, 4));
      } catch (err) {
        setError(err.message || "Failed to fetch dashboard data");
      } finally {
        setTimeout(() => setLoading(false), 800);
      }
    };

    fetchData();
  }, []);

  // Helper ngitung jam (sama kayak di BookingTable)
  const getDuration = (start, end) => {
    if (!start || !end) return "-";
    const diffMs = new Date(end) - new Date(start);
    const diffHrs = diffMs / 3600000;
    return diffHrs > 0 ? `${Math.round(diffHrs)} Hours` : "-";
  };

  if (loading) return <DashboardSkeleton />;
  if (error)
    return <div className="text-red-500 bg-red-50 p-4 rounded-lg">{error}</div>;

  return (
    <div className="max-w-[1600px] mx-auto animate-fade-in pb-10">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* ================= LEFT COLUMN ================= */}
        <div className="lg:col-span-2 space-y-6">
          {/* HERO BANNER */}
          <div className="bg-[var(--color-primary)] rounded-3xl p-8 md:p-10 text-white relative overflow-hidden shadow-lg">
            <div className="absolute -right-20 -top-20 w-96 h-96 bg-white opacity-10 rounded-full blur-3xl"></div>
            <div className="relative z-10 max-w-lg">
              <p className="text-sm font-semibold tracking-wider text-purple-200 mb-3 uppercase">
                Overview
              </p>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
                Maximize Facility Utilization
              </h1>
              <p className="text-purple-100 mb-8 text-lg">
                Manage gaming rooms, monitor active setups, and streamline
                bookings for peak performance.
              </p>
              <Link
                to="/bookings"
                className="inline-flex bg-white text-[var(--color-primary)] px-6 py-3 rounded-full font-semibold items-center gap-2 hover:bg-gray-50 transition-colors shadow-md"
              >
                View Schedule <ArrowRight size={18} />
              </Link>
            </div>
          </div>

          {/* STATS CARDS */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {/* Card 1 */}
            <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow group">
              <div className="w-10 h-10 rounded-full bg-purple-50 text-[var(--color-primary)] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Gamepad2 size={20} />
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500 mb-1">
                  Active Bookings
                </p>
                <h3 className="text-2xl font-bold text-gray-800">
                  {stats.activeBookings}
                </h3>
                <p className="text-xs text-[var(--color-primary)] font-semibold mt-2 flex items-center gap-1">
                  <ArrowUpRight size={12} /> Live Data
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow group">
              <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Monitor size={20} />
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500 mb-1">
                  Available Rooms
                </p>
                <h3 className="text-2xl font-bold text-gray-800">
                  {stats.availableRooms}
                  <span className="text-sm text-gray-400 font-normal">/20</span>
                </h3>
                <p className="text-xs text-gray-500 mt-2">
                  Optimal utilization
                </p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow group">
              <div className="w-10 h-10 rounded-full bg-green-50 text-green-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Wallet size={20} />
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500 mb-1">
                  Monthly Revenue
                </p>
                <h3 className="text-2xl font-bold text-gray-800">
                  Rp {(stats.revenue / 1000000).toFixed(1)}M
                </h3>
                <p className="text-xs text-green-600 font-semibold mt-2 flex items-center gap-1">
                  <ArrowUpRight size={12} /> Generated
                </p>
              </div>
            </div>

            {/* Card 4 */}
            <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow group">
              <div className="w-10 h-10 rounded-full bg-orange-50 text-orange-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Users size={20} />
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500 mb-1">
                  Total Bookings
                </p>
                <h3 className="text-2xl font-bold text-gray-800">
                  {stats.totalBookings}
                </h3>
                <p className="text-xs text-gray-500 mt-2 flex items-center gap-1">
                  <Users size={12} /> All time data
                </p>
              </div>
            </div>
          </div>

          {/* RECENT BOOKINGS (DATA REAL DB) */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-800">
                Recent Bookings
              </h2>
              <Link
                to="/bookings"
                className="text-sm text-[var(--color-primary)] font-semibold hover:underline flex items-center gap-1"
              >
                View All <ArrowRight size={14} />
              </Link>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full text-left">
                <thead className="border-b border-gray-100 text-xs font-semibold text-gray-500 uppercase">
                  <tr>
                    <th className="pb-3 px-2">User</th>
                    <th className="pb-3 px-2">Setup/Room</th>
                    <th className="pb-3 px-2">Duration</th>
                    <th className="pb-3 px-2">Status</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {recentBookings.length === 0 ? (
                    <tr>
                      <td
                        colSpan="4"
                        className="py-6 text-center text-gray-500"
                      >
                        No recent bookings found.
                      </td>
                    </tr>
                  ) : (
                    recentBookings.map((booking) => {
                      const displayName =
                        booking.username ||
                        booking.nama_user ||
                        `User ID: ${booking.user_id}`;
                      const initials = displayName
                        .substring(0, 2)
                        .toUpperCase();
                      const duration = getDuration(
                        booking.waktu_mulai,
                        booking.waktu_selesai,
                      );

                      return (
                        <tr
                          key={booking.booking_id}
                          className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors"
                        >
                          <td className="py-4 px-2 flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs">
                              {initials}
                            </div>
                            <div>
                              <p className="font-semibold text-gray-800">
                                {displayName}
                              </p>
                              <p className="text-xs text-gray-400">
                                ID: #{booking.user_id}
                              </p>
                            </div>
                          </td>
                          <td className="py-4 px-2 text-gray-600">
                            {booking.room_id
                              ? `Room ${booking.room_id}`
                              : booking.setup_id
                                ? `Setup ${booking.setup_id}`
                                : "Unassigned"}
                          </td>
                          <td className="py-4 px-2 text-gray-600">
                            {duration}
                          </td>
                          <td className="py-4 px-2">
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                booking.status_booking === "Active"
                                  ? "bg-blue-50 text-blue-600"
                                  : booking.status_booking === "Completed"
                                    ? "bg-green-50 text-green-600"
                                    : "bg-gray-100 text-gray-600"
                              }`}
                            >
                              {booking.status_booking}
                            </span>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* ================= RIGHT COLUMN (TETAP SAMA KAYAK SEBELUMNYA) ================= */}
        <div className="space-y-6">
          {/* PEAK HOURS CHART */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-800">Peak Hours</h2>
              <button className="text-gray-400 hover:text-gray-800">
                <MoreVertical size={20} />
              </button>
            </div>
            <div className="flex items-end justify-between h-40 gap-2 mb-2">
              <div className="w-full bg-[var(--color-primary-soft)] rounded-t-md h-[40%] hover:bg-[var(--color-primary)] transition-colors cursor-pointer relative group"></div>
              <div className="w-full bg-[var(--color-primary-soft)] rounded-t-md h-[60%] hover:bg-[var(--color-primary)] transition-colors cursor-pointer relative group"></div>
              <div className="w-full bg-[var(--color-primary)] rounded-t-md h-[95%] relative">
                <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-bold text-[var(--color-primary)]">
                  34k
                </span>
              </div>
              <div className="w-full bg-[var(--color-primary-soft)] rounded-t-md h-[70%] hover:bg-[var(--color-primary)] transition-colors cursor-pointer"></div>
              <div className="w-full bg-[var(--color-primary-soft)] rounded-t-md h-[50%] hover:bg-[var(--color-primary)] transition-colors cursor-pointer"></div>
            </div>
            <div className="flex justify-between text-xs text-gray-400 font-medium px-1">
              <span>MON</span>
              <span>TUE</span>
              <span>WED</span>
              <span>THU</span>
              <span>FRI</span>
            </div>
          </div>

          {/* STAFF ON DUTY */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-800">Staff on Duty</h2>
              <button className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 text-gray-500">
                <Plus size={16} />
              </button>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-600 text-xs">
                      MT
                    </div>
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800 text-sm">
                      Marcus Thorne
                    </p>
                    <p className="text-xs text-gray-400">Tech Support</p>
                  </div>
                </div>
                <button className="bg-[var(--color-primary-soft)] text-[var(--color-primary)] px-3 py-1 rounded-full text-xs font-bold hover:bg-[var(--color-primary)] hover:text-white transition-colors">
                  Msg
                </button>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-600 text-xs">
                      ER
                    </div>
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800 text-sm">
                      Elena Rostova
                    </p>
                    <p className="text-xs text-gray-400">Floor Manager</p>
                  </div>
                </div>
                <button className="bg-[var(--color-primary-soft)] text-[var(--color-primary)] px-3 py-1 rounded-full text-xs font-bold hover:bg-[var(--color-primary)] hover:text-white transition-colors">
                  Msg
                </button>
              </div>
            </div>
            <button className="w-full mt-6 py-2 text-sm font-semibold text-[var(--color-primary)] hover:underline">
              View Full Roster
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
