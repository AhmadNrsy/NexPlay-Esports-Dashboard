import { Edit2, Trash2, MoreVertical } from "lucide-react";

// Skeleton Loader Component
export const UserTableSkeleton = () => {
  return (
    <div className="overflow-hidden bg-white rounded-xl border border-gray-100 shadow-[var(--shadow-subtle)]">
      <table className="min-w-full text-left border-collapse">
        <thead className="bg-gray-50/50">
          <tr>
            {["User", "Email", "Tier", "Actions"].map((item, idx) => (
              <th key={idx} className="py-4 px-6 border-b border-gray-100">
                <div className="h-4 bg-gray-200 rounded w-20 animate-pulse"></div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {[1, 2, 3, 4, 5].map((item) => (
            <tr key={item} className="border-b border-gray-50">
              <td className="py-4 px-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse"></div>
                  <div className="flex flex-col gap-2">
                    <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
                    <div className="h-3 bg-gray-100 rounded w-16 animate-pulse"></div>
                  </div>
                </div>
              </td>
              <td className="py-4 px-6">
                <div className="h-4 bg-gray-200 rounded w-32 animate-pulse"></div>
              </td>
              <td className="py-4 px-6">
                <div className="h-6 bg-gray-200 rounded-full w-20 animate-pulse"></div>
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
};

// Main Table Component
const UserTable = ({ users, onEdit, onDelete }) => {
  // Helper to generate dynamic avatar URL based on username
  const getAvatar = (name) =>
    `https://ui-avatars.com/api/?name=${name}&background=random&color=fff&bold=true`;

  return (
    <div className="overflow-x-auto bg-white rounded-xl border border-gray-100 shadow-[var(--shadow-subtle)] animate-fade-in">
      <table className="min-w-full text-left border-collapse">
        <thead className="bg-gray-50/80 text-gray-500 text-xs uppercase tracking-wider font-semibold">
          <tr>
            <th className="py-4 px-6 border-b border-gray-100 rounded-tl-xl">
              User
            </th>
            <th className="py-4 px-6 border-b border-gray-100">Email</th>
            <th className="py-4 px-6 border-b border-gray-100">Tier</th>
            <th className="py-4 px-6 border-b border-gray-100 text-right rounded-tr-xl">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="text-gray-700 text-sm">
          {users.length === 0 ? (
            <tr>
              <td colSpan="4" className="py-12 px-4 text-center text-gray-500">
                <div className="flex flex-col items-center justify-center">
                  <div className="w-16 h-16 mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                    <MoreVertical className="text-gray-400" size={24} />
                  </div>
                  <p className="font-medium">No users found.</p>
                  <p className="text-xs text-gray-400 mt-1">
                    Try adjusting your search or filters.
                  </p>
                </div>
              </td>
            </tr>
          ) : (
            users.map((user) => (
              <tr
                key={user.user_id}
                className="hover:bg-gray-50/80 border-b border-gray-50 last:border-0 transition-colors group"
              >
                <td className="py-4 px-6">
                  <div className="flex items-center gap-3">
                    <img
                      src={getAvatar(user.username)}
                      alt={user.username}
                      className="w-10 h-10 rounded-full shadow-sm border border-gray-100"
                    />
                    <div className="flex flex-col">
                      <span className="font-semibold text-[var(--color-ink-primary)]">
                        {user.username}
                      </span>
                      <span className="text-xs text-gray-400">
                        ID: #{user.user_id}
                      </span>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-6 text-gray-600">{user.email}</td>
                <td className="py-4 px-6">
                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold rounded-full border ${
                      user.tier_member === "Radiant"
                        ? "bg-purple-50 text-purple-700 border-purple-200"
                        : user.tier_member === "Gold"
                          ? "bg-yellow-50 text-yellow-700 border-yellow-200"
                          : user.tier_member === "Silver"
                            ? "bg-gray-100 text-gray-700 border-gray-300"
                            : "bg-orange-50 text-orange-700 border-orange-200"
                    }`}
                  >
                    {user.tier_member === "Radiant" && "💎"}
                    {user.tier_member === "Gold" && "🏆"}
                    {user.tier_member === "Silver" && "🥈"}
                    {user.tier_member}
                  </span>
                </td>
                <td className="py-4 px-6 text-right">
                  <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => onEdit(user)}
                      className="p-2 text-gray-400 hover:text-[var(--color-primary)] hover:bg-[var(--color-primary-soft)] rounded-lg transition-all"
                      title="Edit User"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      onClick={() => onDelete(user.user_id)}
                      className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                      title="Delete User"
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

export default UserTable;
