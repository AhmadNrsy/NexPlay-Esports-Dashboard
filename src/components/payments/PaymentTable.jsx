const PaymentTable = ({ payments, onEdit, onDelete }) => {
  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow border border-gray-200">
      <table className="min-w-full text-left border-collapse">
        <thead className="bg-gray-50 text-gray-600 text-sm uppercase font-semibold">
          <tr>
            <th className="py-3 px-4 border-b">ID</th>
            <th className="py-3 px-4 border-b">Booking ID</th>
            <th className="py-3 px-4 border-b">Method</th>
            <th className="py-3 px-4 border-b">Status</th>
            <th className="py-3 px-4 border-b text-center">Actions</th>
          </tr>
        </thead>
        <tbody className="text-gray-700 text-sm">
          {payments.length === 0 ? (
            <tr>
              <td colSpan="5" className="py-6 px-4 text-center text-gray-500">
                No payments found.
              </td>
            </tr>
          ) : (
            payments.map((payment) => (
              <tr
                key={payment.payment_id}
                className="hover:bg-gray-50 border-b last:border-0 transition-colors"
              >
                <td className="py-3 px-4">{payment.payment_id}</td>
                <td className="py-3 px-4 font-medium">{payment.booking_id}</td>
                <td className="py-3 px-4">{payment.metode_bayar}</td>
                <td className="py-3 px-4">
                  <span
                    className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${
                      payment.status_bayar === "Paid"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800" // Unpaid or empty
                    }`}
                  >
                    {payment.status_bayar || "Unpaid"}
                  </span>
                </td>
                <td className="py-3 px-4 text-center">
                  <button
                    onClick={() => onEdit(payment)}
                    className="text-blue-600 hover:text-blue-800 font-medium mr-4"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(payment.payment_id)}
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

export default PaymentTable;
