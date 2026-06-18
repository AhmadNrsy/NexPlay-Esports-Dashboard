const UserTable = ({ users, onEdit, onDelete }) => {
  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow border border-gray-200">
      <table className="min-w-full text-left border-collapse">
        <thead className="bg-gray-50 text-gray-600 text-sm uppercase font-semibold">
          <tr>
            <th className="py-3 px-4 border-b">ID</th>
            <th className="py-3 px-4 border-b">Username</th>
            <th className="py-3 px-4 border-b">Email</th>
            <th className="py-3 px-4 border-b">Tier</th>
            <th className="py-3 px-4 border-b text-center">Actions</th>
          </tr>
        </thead>
        <tbody className="text-gray-700 text-sm">
          {users.length === 0 ? (
            <tr>
              <td colSpan="5" className="py-6 px-4 text-center text-gray-500">
                No users found.
              </td>
            </tr>
          ) : (
            users.map((user) => (
              <tr
                key={user.user_id}
                className="hover:bg-gray-50 border-b last:border-0 transition-colors"
              >
                <td className="py-3 px-4">{user.user_id}</td>
                <td className="py-3 px-4 font-medium">{user.username}</td>
                <td className="py-3 px-4">{user.email}</td>
                <td className="py-3 px-4">
                  <span
                    className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${
                      user.tier_member === "Radiant"
                        ? "bg-purple-100 text-purple-800"
                        : user.tier_member === "Gold"
                        ? "bg-yellow-100 text-yellow-800"
                        : user.tier_member === "Silver"
                        ? "bg-gray-200 text-gray-800"
                        : "bg-orange-100 text-orange-800" // Bronze
                    }`}
                  >
                    {user.tier_member}
                  </span>
                </td>
                <td className="py-3 px-4 text-center">
                  <button
                    onClick={() => onEdit(user)}
                    className="text-blue-600 hover:text-blue-800 font-medium mr-4"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(user.user_id)}
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

export default UserTable;
