import { Edit2, Trash2, MoreVertical, MonitorPlay } from "lucide-react";

export const GamingRoomSkeleton = () => (
  <div className="overflow-hidden bg-white rounded-xl border border-gray-100 shadow-[var(--shadow-subtle)]">
    <table className="min-w-full text-left border-collapse">
      <thead className="bg-gray-50/50">
        <tr>
          {["Room", "Type", "Price/Hr", "Status", "Actions"].map((_, idx) => (
            <th key={idx} className="py-4 px-6 border-b border-gray-100">
              <div className="h-4 bg-gray-200 rounded w-20 animate-pulse"></div>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {[1, 2, 3, 4].map((i) => (
          <tr key={i} className="border-b border-gray-50">
            <td className="py-4 px-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-200 rounded-lg animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
              </div>
            </td>
            <td className="py-4 px-6">
              <div className="h-6 bg-gray-200 rounded-full w-16 animate-pulse"></div>
            </td>
            <td className="py-4 px-6">
              <div className="h-4 bg-gray-200 rounded w-16 animate-pulse"></div>
            </td>
            <td className="py-4 px-6">
              <div className="h-6 bg-gray-200 rounded-full w-24 animate-pulse"></div>
            </td>
            <td className="py-4 px-6">
              <div className="h-8 bg-gray-200 rounded w-16 animate-pulse"></div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const GamingRoomTable = ({ rooms, onEdit, onDelete }) => {
  return (
    <div className="overflow-x-auto bg-white rounded-xl border border-gray-100 shadow-[var(--shadow-subtle)] animate-fade-in">
      <table className="min-w-full text-left border-collapse">
        <thead className="bg-gray-50/80 text-gray-500 text-xs uppercase tracking-wider font-semibold">
          <tr>
            <th className="py-4 px-6 border-b border-gray-100 rounded-tl-xl">
              Room Name
            </th>
            <th className="py-4 px-6 border-b border-gray-100">Type</th>
            <th className="py-4 px-6 border-b border-gray-100">Price/Hour</th>
            <th className="py-4 px-6 border-b border-gray-100">Status</th>
            <th className="py-4 px-6 border-b border-gray-100 text-right rounded-tr-xl">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="text-sm">
          {rooms.length === 0 ? (
            <tr>
              <td colSpan="5" className="py-12 px-4 text-center text-gray-500">
                <div className="flex flex-col items-center justify-center">
                  <div className="w-16 h-16 mb-4 bg-gray-50 rounded-full flex items-center justify-center">
                    <MonitorPlay className="text-gray-400" size={24} />
                  </div>
                  <p className="font-medium text-gray-600">
                    No gaming rooms found.
                  </p>
                </div>
              </td>
            </tr>
          ) : (
            rooms.map((room) => (
              <tr
                key={room.room_id}
                className="hover:bg-gray-50/80 border-b border-gray-50 last:border-0 transition-colors group"
              >
                <td className="py-4 px-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[var(--color-primary-soft)] text-[var(--color-primary)] rounded-lg flex items-center justify-center border border-[var(--color-primary)]/20">
                      <MonitorPlay size={20} />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-bold text-[var(--color-ink-primary)]">
                        {room.nama_room}
                      </span>
                      <span className="text-xs text-gray-400">
                        ID: {room.room_id}
                      </span>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <span
                    className={`inline-flex items-center px-2.5 py-1 text-[11px] font-bold rounded-full uppercase tracking-wide border ${
                      room.tipe_room?.toUpperCase().includes("VVIP")
                        ? "bg-purple-100 text-purple-700 border-purple-200"
                        : room.tipe_room?.toUpperCase().includes("VIP")
                          ? "bg-yellow-100 text-yellow-700 border-yellow-200"
                          : "bg-gray-100 text-gray-700 border-gray-200"
                    }`}
                  >
                    {room.tipe_room?.toUpperCase().includes("VVIP") && "💎 "}
                    {room.tipe_room?.toUpperCase().includes("VIP") &&
                      !room.tipe_room?.toUpperCase().includes("VVIP") &&
                      "⭐ "}
                    {room.tipe_room}
                  </span>
                </td>
                <td className="py-4 px-6 font-semibold text-gray-700">
                  Rp {Number(room.harga_per_jam).toLocaleString("id-ID")}
                </td>
                <td className="py-4 px-6">
                  <div
                    className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-full border ${
                      room.status_room === "Available"
                        ? "bg-green-50 text-green-700 border-green-200"
                        : room.status_room === "Maintenance"
                          ? "bg-orange-50 text-orange-700 border-orange-200"
                          : "bg-red-50 text-red-700 border-red-200"
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        room.status_room === "Available"
                          ? "bg-green-500"
                          : room.status_room === "Maintenance"
                            ? "bg-orange-500"
                            : "bg-red-500"
                      }`}
                    ></span>
                    {room.status_room}
                  </div>
                </td>
                <td className="py-4 px-6 text-right">
                  <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => onEdit(room)}
                      className="p-2 text-gray-400 hover:text-[var(--color-primary)] hover:bg-[var(--color-primary-soft)] rounded-lg transition-all"
                      title="Edit"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      onClick={() => onDelete(room.room_id)}
                      className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                      title="Delete"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
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
