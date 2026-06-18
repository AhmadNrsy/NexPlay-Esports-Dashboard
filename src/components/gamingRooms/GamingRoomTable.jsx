const GamingRoomTable = ({ rooms, onEdit, onDelete }) => {
  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow border border-gray-200">
      <table className="min-w-full text-left border-collapse">
        <thead className="bg-gray-50 text-gray-600 text-sm uppercase font-semibold">
          <tr>
            <th className="py-3 px-4 border-b">ID</th>
            <th className="py-3 px-4 border-b">Room Name</th>
            <th className="py-3 px-4 border-b">Type</th>
            <th className="py-3 px-4 border-b">Price/Hour</th>
            <th className="py-3 px-4 border-b">Status</th>
            <th className="py-3 px-4 border-b text-center">Actions</th>
          </tr>
        </thead>
        <tbody className="text-gray-700 text-sm">
          {rooms.length === 0 ? (
            <tr>
              <td colSpan="6" className="py-6 px-4 text-center text-gray-500">
                No gaming rooms found.
              </td>
            </tr>
          ) : (
            rooms.map((room) => (
              <tr
                key={room.room_id}
                className="hover:bg-gray-50 border-b last:border-0 transition-colors"
              >
                <td className="py-3 px-4">{room.room_id}</td>
                <td className="py-3 px-4 font-medium">{room.nama_room}</td>
                <td className="py-3 px-4">{room.tipe_room}</td>
                <td className="py-3 px-4">
                  Rp {Number(room.harga_per_jam).toLocaleString("id-ID")}
                </td>
                <td className="py-3 px-4">
                  <span
                    className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${
                      room.status_room === "Available"
                        ? "bg-green-100 text-green-800"
                        : room.status_room === "Maintenance"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800" // In Use
                    }`}
                  >
                    {room.status_room}
                  </span>
                </td>
                <td className="py-3 px-4 text-center">
                  <button
                    onClick={() => onEdit(room)}
                    className="text-blue-600 hover:text-blue-800 font-medium mr-4"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(room.room_id)}
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

export default GamingRoomTable;
