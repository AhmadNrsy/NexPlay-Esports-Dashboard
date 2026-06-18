import { useState, useEffect, useMemo } from "react";
import paymentsService from "../../services/paymentsService";
import PaymentTable, {
  PaymentTableSkeleton,
} from "../../components/payments/PaymentTable";
import PaymentModal from "../../components/payments/PaymentModal";
import PaymentForm from "../../components/payments/PaymentForm";
import {
  Download,
  Landmark,
  FileText,
  CheckCircle,
  Undo2,
  Filter,
  MoreVertical,
} from "lucide-react";

const PaymentsPage = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  const fetchPayments = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await paymentsService.getAllPayments();
      setPayments(response.data || response || []);
    } catch (err) {
      setError(err.message || "Failed to load payments data.");
    } finally {
      setTimeout(() => setLoading(false), 500);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  // UI Stats calculation (100% connected to DB)
  const stats = useMemo(() => {
    const totalRev = payments
      .filter((p) => p.status_bayar === "Paid")
      .reduce(
        (acc, p) =>
          acc + Number(p.amount || p.total_bayar || p.total_harga || 0),
        0,
      );

    const pending = payments.filter(
      (p) => p.status_bayar !== "Paid" && p.status_bayar !== "Failed",
    ).length;

    const completed = payments.filter((p) => p.status_bayar === "Paid").length;
    const failed = payments.filter((p) => p.status_bayar === "Failed").length;

    return { revenue: totalRev, pending, completed, refunds: failed };
  }, [payments]);

  const handleOpenEdit = (payment) => {
    setSelectedPayment(payment);
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPayment(null);
  };

  const handleSavePayment = async (formData) => {
    setIsSaving(true);
    try {
      await paymentsService.updatePayment(selectedPayment.payment_id, formData);
      setSuccess("Payment updated successfully!");
      handleCloseModal();
      fetchPayments();
    } catch (err) {
      alert(`Error: ${err.message}`);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="max-w-[1600px] mx-auto animate-fade-in pb-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[var(--color-ink-primary)] tracking-tight mb-1">
            Payments
          </h1>
          <p className="text-[var(--color-ink-muted)] text-sm">
            Overview and management of financial transactions.
          </p>
        </div>
        <button className="flex items-center gap-2 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 px-5 py-2.5 rounded-lg shadow-sm text-sm font-semibold transition-all">
          <Download size={18} /> Download Report
        </button>
      </div>

      {/* Financial Widgets */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {/* Widget 1 */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm relative overflow-hidden">
          <div className="absolute top-6 right-6 w-12 h-12 bg-[var(--color-primary-soft)] text-[var(--color-primary)] rounded-full flex items-center justify-center">
            <Landmark size={20} />
          </div>
          <p className="text-sm font-semibold text-gray-600 mb-2">
            Total Revenue
          </p>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Rp {stats.revenue.toLocaleString("id-ID")}
          </h2>
          <p className="text-xs text-green-600 font-bold flex items-center gap-1">
            Real-time data
          </p>
        </div>

        {/* Widget 2 */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm relative overflow-hidden">
          <div className="absolute top-6 right-6 w-12 h-12 bg-gray-100 text-gray-600 rounded-full flex items-center justify-center">
            <FileText size={20} />
          </div>
          <p className="text-sm font-semibold text-gray-600 mb-2">
            Pending Invoices
          </p>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            {stats.pending}
          </h2>
          <p className="text-xs text-gray-500 font-medium">Awaiting payment</p>
        </div>

        {/* Widget 3 */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm relative overflow-hidden">
          <div className="absolute top-6 right-6 w-12 h-12 bg-green-50 text-green-600 rounded-full flex items-center justify-center">
            <CheckCircle size={20} />
          </div>
          <p className="text-sm font-semibold text-gray-600 mb-2">
            Completed Transactions
          </p>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            {stats.completed}
          </h2>
          <p className="text-xs text-green-600 font-bold flex items-center gap-1">
            Paid in full
          </p>
        </div>

        {/* Widget 4 */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm relative overflow-hidden">
          <div className="absolute top-6 right-6 w-12 h-12 bg-red-50 text-red-600 rounded-full flex items-center justify-center">
            <Undo2 size={20} />
          </div>
          <p className="text-sm font-semibold text-gray-600 mb-2">
            Failed / Refunds
          </p>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            {stats.refunds}
          </h2>
          <p className="text-xs text-red-600 font-bold flex items-center gap-1">
            Requires attention
          </p>
        </div>
      </div>

      {/* Main Table Area */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            Recent Transactions
          </h2>
          <div className="flex items-center gap-3">
            <button className="p-2 text-gray-500 hover:bg-gray-50 rounded-lg">
              <Filter size={20} />
            </button>
            <button className="p-2 text-gray-500 hover:bg-gray-50 rounded-lg">
              <MoreVertical size={20} />
            </button>
          </div>
        </div>
        {loading ? (
          <PaymentTableSkeleton />
        ) : (
          <PaymentTable payments={payments} onEdit={handleOpenEdit} />
        )}
      </div>

      {/* Modal is kept only for edit logic */}
      <PaymentModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title="Edit Payment"
      >
        <PaymentForm
          initialData={selectedPayment}
          onSave={handleSavePayment}
          onCancel={handleCloseModal}
          loading={isSaving}
        />
      </PaymentModal>
    </div>
  );
};

export default PaymentsPage;
