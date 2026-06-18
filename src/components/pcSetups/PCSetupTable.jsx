const PCSetupTable = ({ setups, onEdit, onDelete }) => {
  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow border border-gray-200">
      <table className="min-w-full text-left border-collapse">
        <thead className="bg-gray-50 text-gray-600 text-sm uppercase font-semibold">
          <tr>
            <th className="py-3 px-4 border-b">PC ID</th>
            <th className="py-3 px-4 border-b">Room ID</th>
            <th className="py-3 px-4 border-b">CPU</th>
            <th className="py-3 px-4 border-b">GPU</th>
            <th className="py-3 px-4 border-b">Monitor</th>
            <th className="py-3 px-4 border-b text-center">Actions</th>
          </tr>
        </thead>
        <tbody className="text-gray-700 text-sm">
          {setups.length === 0 ? (
            <tr>
              <td colSpan="6" className="py-6 px-4 text-center text-gray-500">
                No PC setups found.
              </td>
            </tr>
          ) : (
            setups.map((setup) => (
              <tr
                key={setup.pc_id}
                className="hover:bg-gray-50 border-b last:border-0 transition-colors"
              >
                <td className="py-3 px-4">{setup.pc_id}</td>
                <td className="py-3 px-4 font-medium">{setup.room_id}</td>
                <td className="py-3 px-4">{setup.spek_cpu}</td>
                <td className="py-3 px-4">{setup.spek_gpu}</td>
                <td className="py-3 px-4">{setup.monitor}</td>
                <td className="py-3 px-4 text-center">
                  <button
                    onClick={() => onEdit(setup)}
                    className="text-blue-600 hover:text-blue-800 font-medium mr-4"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(setup.pc_id)}
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

export default PCSetupTable;
