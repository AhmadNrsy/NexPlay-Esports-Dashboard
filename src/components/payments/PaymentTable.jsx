import { Edit2, CreditCard, Wallet, QrCode, Banknote } from "lucide-react";

export const PaymentTableSkeleton = () => (
  <div className="overflow-hidden bg-white rounded-xl border border-gray-100 shadow-[var(--shadow-subtle)]">
    <div className="p-12 text-center text-gray-400 animate-pulse font-medium">
      Loading financial records...
    </div>
  </div>
);

const PaymentTable = ({ payments, onEdit }) => {
  const getMethodIcon = (method) => {
    const lower = (method || "").toLowerCase();
    if (lower.includes("qris"))
      return <QrCode size={18} className="text-purple-600" />;
    if (lower.includes("gopay") || lower.includes("ovo"))
      return <Wallet size={18} className="text-blue-500" />;
    if (lower.includes("cash"))
      return <Banknote size={18} className="text-green-600" />;
    return <CreditCard size={18} className="text-gray-600" />;
  };

  return (
    <div className="overflow-x-auto bg-white rounded-xl border border-gray-100 shadow-[var(--shadow-subtle)] animate-fade-in">
      <table className="min-w-full text-left border-collapse">
        <thead className="bg-gray-50/80 text-gray-500 text-xs uppercase tracking-wider font-semibold">
          <tr>
            <th className="py-4 px-6 border-b border-gray-100">
              Transaction ID
            </th>
            <th className="py-4 px-6 border-b border-gray-100">Booking Ref</th>
            <th className="py-4 px-6 border-b border-gray-100">
              Payment Method
            </th>
            <th className="py-4 px-6 border-b border-gray-100">Amount</th>
            <th className="py-4 px-6 border-b border-gray-100">Status</th>
            <th className="py-4 px-6 border-b border-gray-100 text-right">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="text-sm">
          {payments.length === 0 ? (
            <tr>
              <td colSpan="6" className="py-12 px-4 text-center text-gray-500">
                No transactions found.
              </td>
            </tr>
          ) : (
            payments.map((payment) => {
              // Real DB Mapping: Fallback ke 0 jika amount belum di-JOIN dari DB
              const amountValue = Number(
                payment.amount ||
                  payment.total_bayar ||
                  payment.total_harga ||
                  0,
              );

              return (
                <tr
                  key={payment.payment_id}
                  className="hover:bg-gray-50/80 border-b border-gray-50 last:border-0 transition-colors"
                >
                  <td className="py-4 px-6 text-gray-500 font-medium text-xs">
                    #TRX-{String(payment.payment_id).padStart(4, "0")}
                  </td>
                  <td className="py-4 px-6">
                    <div className="font-semibold text-gray-800">
                      Booking #{payment.booking_id}
                    </div>
                    {payment.username && (
                      <div className="text-xs text-gray-400">
                        {payment.username}
                      </div>
                    )}
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2 text-gray-700 font-medium">
                      {getMethodIcon(payment.metode_bayar)}
                      {payment.metode_bayar || "N/A"}
                    </div>
                  </td>
                  <td className="py-4 px-6 font-bold text-gray-800">
                    Rp {amountValue.toLocaleString("id-ID")}
                  </td>
                  <td className="py-4 px-6">
                    <span
                      className={`inline-flex items-center px-2.5 py-1 text-[11px] font-bold rounded-full ${
                        payment.status_bayar === "Paid"
                          ? "bg-green-50 text-green-700 border border-green-200"
                          : payment.status_bayar === "Failed"
                            ? "bg-red-50 text-red-700 border border-red-200"
                            : "bg-orange-50 text-orange-700 border border-orange-200"
                      }`}
                    >
                      {payment.status_bayar || "Unpaid"}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <button
                      onClick={() => onEdit(payment)}
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

export default PaymentTable;
