import { Edit2, Trash2, Cpu } from "lucide-react";

export const PCSetupSkeleton = () => (
  <div className="overflow-hidden bg-white rounded-xl border border-gray-100 shadow-[var(--shadow-subtle)]">
    <table className="min-w-full text-left border-collapse">
      <thead className="bg-gray-50/50">
        <tr>
          {["Unit ID", "Room ID", "Core Specs", "Performance", "Actions"].map(
            (_, idx) => (
              <th key={idx} className="py-4 px-6 border-b border-gray-100">
                <div className="h-4 bg-gray-200 rounded w-20 animate-pulse"></div>
              </th>
            ),
          )}
        </tr>
      </thead>
      <tbody>
        {[1, 2, 3, 4].map((i) => (
          <tr key={i} className="border-b border-gray-50">
            <td className="py-4 px-6">
              <div className="h-8 bg-gray-200 rounded w-16 animate-pulse"></div>
            </td>
            <td className="py-4 px-6">
              <div className="h-4 bg-gray-200 rounded w-20 animate-pulse"></div>
            </td>
            <td className="py-4 px-6">
              <div className="flex flex-col gap-2">
                <div className="h-4 bg-gray-200 rounded w-48 animate-pulse"></div>
                <div className="h-3 bg-gray-100 rounded w-32 animate-pulse"></div>
              </div>
            </td>
            <td className="py-4 px-6">
              <div className="h-2 bg-gray-200 rounded-full w-24 animate-pulse"></div>
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

const PCSetupTable = ({ setups, onEdit, onDelete }) => {
  return (
    <div className="overflow-x-auto bg-white rounded-xl border border-gray-100 shadow-[var(--shadow-subtle)] animate-fade-in">
      <table className="min-w-full text-left border-collapse">
        <thead className="bg-gray-50/80 text-gray-500 text-xs uppercase tracking-wider font-semibold">
          <tr>
            <th className="py-4 px-6 border-b border-gray-100 rounded-tl-xl">
              Unit ID
            </th>
            <th className="py-4 px-6 border-b border-gray-100">
              Assigned Room
            </th>
            <th className="py-4 px-6 border-b border-gray-100">Core Specs</th>
            <th className="py-4 px-6 border-b border-gray-100">Performance</th>
            <th className="py-4 px-6 border-b border-gray-100 text-right rounded-tr-xl">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="text-sm">
          {setups.length === 0 ? (
            <tr>
              <td colSpan="5" className="py-12 px-4 text-center text-gray-500">
                <div className="flex flex-col items-center justify-center">
                  <div className="w-16 h-16 mb-4 bg-gray-50 rounded-full flex items-center justify-center">
                    <Cpu className="text-gray-400" size={24} />
                  </div>
                  <p className="font-medium text-gray-600">
                    No PC Setups found.
                  </p>
                </div>
              </td>
            </tr>
          ) : (
            setups.map((setup) => {
              // Mocking performance bar visual based on ID for consistent UI
              const perfValue = ((setup.pc_id * 7) % 15) + 85;

              return (
                <tr
                  key={setup.pc_id}
                  className="hover:bg-gray-50/80 border-b border-gray-50 last:border-0 transition-colors group"
                >
                  <td className="py-4 px-6">
                    <span className="bg-blue-50 text-blue-700 font-bold px-2.5 py-1 rounded-md text-xs border border-blue-100">
                      #{String(setup.pc_id).padStart(3, "0")}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-gray-600 font-medium">
                    Room {setup.room_id}
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex flex-col gap-1">
                      <span className="font-semibold text-[var(--color-ink-primary)]">
                        {setup.spek_cpu}{" "}
                        <span className="text-gray-300 mx-1">/</span>{" "}
                        {setup.spek_gpu}
                      </span>
                      <span className="text-xs text-gray-500 font-medium">
                        Display: {setup.monitor}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-24 bg-gray-100 rounded-full h-2 overflow-hidden">
                        <div
                          className="bg-[var(--color-primary)] h-2 rounded-full"
                          style={{ width: `${perfValue}%` }}
                        ></div>
                      </div>
                      <span className="text-xs font-bold text-gray-600">
                        {perfValue}%
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => onEdit(setup)}
                        className="p-2 text-gray-400 hover:text-[var(--color-primary)] hover:bg-[var(--color-primary-soft)] rounded-lg transition-all"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        onClick={() => onDelete(setup.pc_id)}
                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
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

export default PCSetupTable;
