const BookingTable = ({ bookings, onEdit, onDelete }) => {
  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date.toLocaleString("id-ID", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow border border-gray-200">
      <table className="min-w-full text-left border-collapse">
        <thead className="bg-gray-50 text-gray-600 text-sm uppercase font-semibold">
          <tr>
            <th className="py-3 px-4 border-b">ID</th>
            <th className="py-3 px-4 border-b">User ID</th>
            <th className="py-3 px-4 border-b">Room/Setup</th>
            <th className="py-3 px-4 border-b">Start - End</th>
            <th className="py-3 px-4 border-b">Total</th>
            <th className="py-3 px-4 border-b">Status</th>
            <th className="py-3 px-4 border-b text-center">Actions</th>
          </tr>
        </thead>
        <tbody className="text-gray-700 text-sm">
          {bookings.length === 0 ? (
            <tr>
              <td colSpan="7" className="py-6 px-4 text-center text-gray-500">
                No bookings found.
              </td>
            </tr>
          ) : (
            bookings.map((booking) => (
              <tr
                key={booking.booking_id}
                className="hover:bg-gray-50 border-b last:border-0 transition-colors"
              >
                <td className="py-3 px-4">{booking.booking_id}</td>
                <td className="py-3 px-4 font-medium">{booking.user_id}</td>
                <td className="py-3 px-4 text-xs text-gray-500">
                  {booking.room_id ? `Room: ${booking.room_id}` : ""}
                  {booking.room_id && booking.setup_id ? <br /> : ""}
                  {booking.setup_id ? `Setup: ${booking.setup_id}` : ""}
                  {!booking.room_id && !booking.setup_id ? "-" : ""}
                </td>
                <td className="py-3 px-4 text-xs whitespace-nowrap">
                  <div>{formatDate(booking.waktu_mulai)}</div>
                  <div>to {formatDate(booking.waktu_selesai)}</div>
                </td>
                <td className="py-3 px-4">
                  Rp {Number(booking.total_harga).toLocaleString("id-ID")}
                </td>
                <td className="py-3 px-4">
                  <span
                    className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${
                      booking.status_booking === "Completed"
                        ? "bg-green-100 text-green-800"
                        : booking.status_booking === "Active"
                          ? "bg-blue-100 text-blue-800"
                          : booking.status_booking === "Pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800" // Cancelled
                    }`}
                  >
                    {booking.status_booking}
                  </span>
                </td>
                <td className="py-3 px-4 text-center">
                  <button
                    onClick={() => onEdit(booking)}
                    className="text-blue-600 hover:text-blue-800 font-medium mr-3"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(booking.booking_id)}
                    className="text-red-600 hover:text-red-800 font-medium"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default BookingTable;
