import { Edit2, Calendar } from "lucide-react";

export const BookingTableSkeleton = () => (
  // ... (Gunakan skeleton yang sama seperti kode sebelumnya)
  <div className="overflow-hidden bg-white rounded-xl border border-gray-100 shadow-[var(--shadow-subtle)]">
    <div className="p-12 text-center text-gray-400 animate-pulse font-medium">
      Loading schedule data from database...
    </div>
  </div>
);

const BookingTable = ({ bookings, onEdit }) => {
  const formatTime = (dateString) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getRelativeDay = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date.toDateString() === today.toDateString()) return "Today";
    if (date.toDateString() === tomorrow.toDateString()) return "Tomorrow";
    return date.toLocaleDateString("id-ID", { day: "numeric", month: "short" });
  };

  const getDuration = (start, end) => {
    if (!start || !end) return "-";
    const diffMs = new Date(end) - new Date(start);
    const diffHrs = diffMs / 3600000;
    return diffHrs > 0 ? `${Math.round(diffHrs)}h` : "-";
  };

  return (
    <div className="overflow-x-auto bg-white rounded-xl border border-gray-100 shadow-[var(--shadow-subtle)] animate-fade-in">
      <table className="min-w-full text-left border-collapse">
        <thead className="bg-gray-50/80 text-gray-500 text-xs uppercase tracking-wider font-semibold">
          <tr>
            <th className="py-4 px-6 border-b border-gray-100">User</th>
            <th className="py-4 px-6 border-b border-gray-100">
              Room / Station
            </th>
            <th className="py-4 px-6 border-b border-gray-100">Start Time</th>
            <th className="py-4 px-6 border-b border-gray-100">Duration</th>
            <th className="py-4 px-6 border-b border-gray-100">Total Price</th>
            <th className="py-4 px-6 border-b border-gray-100">Status</th>
            <th className="py-4 px-6 border-b border-gray-100 text-right">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="text-sm">
          {bookings.length === 0 ? (
            <tr>
              <td colSpan="7" className="py-12 px-4 text-center text-gray-500">
                <Calendar className="text-gray-400 mx-auto mb-2" size={24} />
                <p>No active schedule found.</p>
              </td>
            </tr>
          ) : (
            bookings.map((booking) => {
              // Real DB Mapping: Fallback ke user_id jika API belum di-JOIN dengan tabel users
              const displayName =
                booking.username ||
                booking.nama_user ||
                `User ID: ${booking.user_id}`;
              const initials = displayName.substring(0, 2).toUpperCase();
              const duration = getDuration(
                booking.waktu_mulai,
                booking.waktu_selesai,
              );
              const price = Number(booking.total_harga || 0).toLocaleString(
                "id-ID",
              );

              return (
                <tr
                  key={booking.booking_id}
                  className="hover:bg-gray-50/80 border-b border-gray-50 last:border-0 transition-colors"
                >
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-sm">
                        {initials}
                      </div>
                      <div className="flex flex-col">
                        <span className="font-bold text-[var(--color-ink-primary)]">
                          {displayName}
                        </span>
                        <span className="text-xs text-gray-400">
                          ID: #{booking.user_id}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex flex-col">
                      <span className="font-semibold text-gray-800">
                        {booking.room_id
                          ? `Room ${booking.room_id}`
                          : booking.setup_id
                            ? `Setup ${booking.setup_id}`
                            : "Unassigned"}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex flex-col">
                      <span className="font-semibold text-gray-800">
                        {formatTime(booking.waktu_mulai)}
                      </span>
                      <span className="text-xs text-gray-500">
                        {getRelativeDay(booking.waktu_mulai)}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-6 font-semibold text-gray-700">
                    {duration}
                  </td>
                  <td className="py-4 px-6 font-semibold text-gray-800">
                    Rp {price}
                  </td>
                  <td className="py-4 px-6">
                    <span
                      className={`inline-flex items-center px-2.5 py-1 text-xs font-bold rounded-full ${
                        booking.status_booking === "Completed"
                          ? "bg-green-50 text-green-700"
                          : booking.status_booking === "Active"
                            ? "bg-blue-50 text-blue-700"
                            : booking.status_booking === "Pending"
                              ? "bg-yellow-50 text-yellow-700"
                              : "bg-red-50 text-red-700"
                      }`}
                    >
                      {booking.status_booking}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <button
                      onClick={() => onEdit(booking)}
                      className="p-2 text-gray-400 hover:text-[var(--color-primary)] transition-all"
                    >
                      <Edit2 size={16} />
                    </button>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
};

export default BookingTable;
