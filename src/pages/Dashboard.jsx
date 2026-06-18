import { useState, useEffect } from "react";
import statisticsService from "../services/statisticsService";
import { Eye, Monitor, DollarSign, BarChart3 } from "lucide-react";

const Dashboard = () => {
  const [stats, setStats] = useState({
    activeBookings: 0,
    availableRooms: 0,
    revenue: 0,
    totalBookings: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        setLoading(true);
        // Using Promise.all to fetch all statistics in parallel
        const [activeData, roomsData, revenueData, totalData] = await Promise.all([
          statisticsService.getActiveBookings(),
          statisticsService.getAvailableRooms(),
          statisticsService.getRevenue(),
          statisticsService.getTotalBookings(),
        ]);

        setStats({
          activeBookings: activeData?.data?.active_bookings ?? activeData?.active_bookings ?? 0,
          availableRooms: roomsData?.data?.available_rooms ?? roomsData?.available_rooms ?? 0,
          revenue: revenueData?.data?.revenue ?? revenueData?.revenue ?? 0,
          totalBookings: totalData?.data?.total_bookings ?? totalData?.total_bookings ?? 0,
        });
      } catch (err) {
        setError(err.message || "Failed to fetch statistics");
      } finally {
        setLoading(false);
      }
    };

    fetchStatistics();
  }, []);

  if (loading) {
    return <div className="text-center py-10">Loading statistics...</div>;
  }

  if (error) {
    return <div className="text-red-500 bg-red-100 p-4 rounded">{error}</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-[var(--color-ink-primary)]">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        
        {/* Active Bookings Card */}
        <div className="bg-[var(--color-surface-card)] rounded-2xl p-6 border border-gray-100 shadow-[var(--shadow-subtle)] flex flex-col gap-3">
          <div className="flex items-center gap-2 text-[var(--color-ink-muted)] text-sm font-medium">
            <Eye size={18} />
            <span>Active Bookings</span>
          </div>
          <div className="text-3xl font-bold text-[var(--color-ink-primary)]">
            {stats.activeBookings}
          </div>
        </div>

        {/* Available Rooms Card */}
        <div className="bg-[var(--color-surface-card)] rounded-2xl p-6 border border-gray-100 shadow-[var(--shadow-subtle)] flex flex-col gap-3">
          <div className="flex items-center gap-2 text-[var(--color-ink-muted)] text-sm font-medium">
            <Monitor size={18} />
            <span>Available Rooms</span>
          </div>
          <div className="text-3xl font-bold text-[var(--color-ink-primary)]">
            {stats.availableRooms}
          </div>
        </div>

        {/* Revenue Card */}
        <div className="bg-[var(--color-surface-card)] rounded-2xl p-6 border border-gray-100 shadow-[var(--shadow-subtle)] flex flex-col gap-3">
          <div className="flex items-center gap-2 text-[var(--color-ink-muted)] text-sm font-medium">
            <DollarSign size={18} />
            <span>Revenue</span>
          </div>
          <div className="text-3xl font-bold text-[var(--color-ink-primary)]">
            Rp {Number(stats.revenue).toLocaleString('id-ID')}
          </div>
        </div>

        {/* Total Bookings Card */}
        <div className="bg-[var(--color-surface-card)] rounded-2xl p-6 border border-gray-100 shadow-[var(--shadow-subtle)] flex flex-col gap-3">
          <div className="flex items-center gap-2 text-[var(--color-ink-muted)] text-sm font-medium">
            <BarChart3 size={18} />
            <span>Total Bookings</span>
          </div>
          <div className="text-3xl font-bold text-[var(--color-ink-primary)]">
            {stats.totalBookings}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
