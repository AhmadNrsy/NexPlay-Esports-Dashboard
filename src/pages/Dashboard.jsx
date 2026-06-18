import { useState, useEffect } from "react";
import statisticsService from "../services/statisticsService";

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
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Active Bookings Card */}
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
          <div className="text-sm text-gray-500 uppercase font-semibold">Active Bookings</div>
          <div className="mt-2 text-3xl font-bold text-gray-800">{stats.activeBookings}</div>
        </div>

        {/* Available Rooms Card */}
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500">
          <div className="text-sm text-gray-500 uppercase font-semibold">Available Rooms</div>
          <div className="mt-2 text-3xl font-bold text-gray-800">{stats.availableRooms}</div>
        </div>

        {/* Revenue Card */}
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-yellow-500">
          <div className="text-sm text-gray-500 uppercase font-semibold">Revenue</div>
          <div className="mt-2 text-3xl font-bold text-gray-800">
            Rp {Number(stats.revenue).toLocaleString('id-ID')}
          </div>
        </div>

        {/* Total Bookings Card */}
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-purple-500">
          <div className="text-sm text-gray-500 uppercase font-semibold">Total Bookings</div>
          <div className="mt-2 text-3xl font-bold text-gray-800">{stats.totalBookings}</div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
